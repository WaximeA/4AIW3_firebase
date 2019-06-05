import { LitElement, html, css } from 'lit-element';
import './data/chat-data.js';
import './data/chat-auth.js';
import './data/chat-login.js';


import firebase from 'firebase/app';

class ChatApp extends LitElement {

  constructor() {
    super();
    this.users = [];
    this.user = {};
    this.messages = [];
    this.message = '';
    this.logged = false;
  }

  static get properties(){
    return {
      unresolved: {
        type: Boolean,
        reflect: true
      },
      email: { type: String },
      pseudo: { type: String },
      users: { type: Array },
      user: { type: Object },
      messages: { type: Array },
      message: { type: String },
      logged: { type: Boolean }

    }
  }

  static get styles() {
    return css`
     :host {
       display: block;
     }
     ::slotted(header) {
       position: sticky;
       top: 0;
       z-index: 1;
       background-color: #fff;
     }
     * {  box-sizing: border-box }
     footer {
       position: fixed;
       bottom: 0;
       width: 100%;
     }
     footer form {
       display: flex;
       justify-content: space-between;
       background-color: #ffffff;
       padding: 0.5rem 1rem;
       width: 100%;
     }
     footer form input {
       width: 100%;
     }

     ul {
       position: relative;
       display: flex;
       flex-direction: column;
       list-style: none;
       padding: 0;
       margin: 0;
       margin-bottom: 3em;
     }

     ul li {
       display: block;
       padding: 0.5rem 1rem;
       margin-bottom: 1rem;
       background-color: #cecece;
       border-radius: 0 30px 30px 0;
       width: 70%;
     }
     ul li.own {
       align-self: flex-end;
       text-align: right;
       background-color: #16a7f1;
       color: #ffffff;
       border-radius: 30px 0 0 30px;
     }
   `;
  }

  firstUpdated() {
    this.unresolved = false;
    this.logged = localStorage.getItem('logged') === 'true' ? true : false;
  }

  customChildChanged(e) {
    this.messages = e.detail;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 0);
  }

  handleLogin(e) {
    this.user = e.detail.user;
  }

  getDate(timestamp) {
    const date = new Date(timestamp);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  }

  sendMessage(e) {
    e.preventDefault();
    firebase.database().ref().child('messages').push({
      content: this.message,
      user: this.user.uid,
      email: this.user.email,
      date: new Date().getTime()
    });
    this.message = '';
  }


  render() {
    return html` 
      <chat-data path="messages" @custom-child-changed="${this.customChildChanged}"></chat-data>
      <slot></slot>
      ${
          !this.logged ? html`
            <chat-auth></chat-auth>
            <chat-login @user-logged="${this.handleLogin}"></chat-login>
          ` : html `
            <h1> Hi ${this.user.email} </h1>
            
            <ul>
              ${this.messages.map(message => html`
                <li class="${message.user === this.user.uid ? 'own' : ''}">
                    <strong>${message.email} send : </strong> ${message.content} - <i>${this.getDate(message.date)}</i>
                </li>
              `)}
            </ul>
            <footer>
              <form @submit="${this.sendMessage}">
                <input type="text" .value="${this.message}" @input="${e => this.message = e.target.value}">
                <button type="submit">Send</button>
              </form>
            </footer>
          `
        }
    `
  }
}

customElements.define('chat-app', ChatApp);