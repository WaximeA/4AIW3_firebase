import { LitElement, html, css } from 'lit-element';
import './data/chat-data.js';
import './data/chat-auth.js';
import './data/chat-login.js';

class ChatApp extends LitElement {

  constructor() {
    super();
    this.users = [];
    this.user = {};
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
      user: { type: Object }
    }
  }

  firstUpdated() {
    this.unresolved = false;
  }

  handleForm(e) {
    e.preventDefault();
    const email = this.shadowRoot.querySelector('input[name=email]');
    const pseudo = this.shadowRoot.querySelector('input[name=pseudo]');

    this.shadowRoot.querySelector('#data').push({
      email: email.value,
      pseudo: pseudo.value
    })
  }

  customChildChanged(e) {
    this.users = e.detail;
  }

  handleLogin(e) {
    this.user = e.detail.user;
  }

  render() {
    return html` 
      <chat-data path="users" @custom-child-changed="${this.customChildChanged}"></chat-data>
      <slot></slot>
      ${
          !this.user.email ? html`
            <chat-auth></chat-auth>
            <chat-login @user-logged="${this.handleLogin}"></chat-login>
          ` : html `
            <h1> Hi ${this.user.email} </h1>
          `
          
        }
      
      
      <ul>
        ${this.users.map(user => html`
          <li>${user.name} ${user.email}</li>
        `)}
      </ul>
    `
  }
}

customElements.define('chat-app', ChatApp);