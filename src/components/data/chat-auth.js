import { LitElement, html, css } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/auth';

class ChatAuth extends LitElement {

  constructor() {
    super();
    this.auth = {};
    this.email = '';
    this.password = '';
  }

  static get properties() {
    return {
      email: String,
      password: String
    }
  }

  static get styles()
  {
    return css`
      :host {
        display: block
      }
    `
  }

  firstUpdated() {
    this.auth = firebase.auth();
  }

  handleForm(e) {
    e.preventDefault();

    if ((!this.email || !this.password)) {
      console.error('Email or Password missing');
    }

    this.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(data => {
      console.info('User created', data);
    });
  }
  
  render() {
    return html`
    <form @submit="${this.handleForm}">
       <input type="text" .value="${this.email}" @input="${e => this.email = e.target.value}">
       <input type="password" .value="${this.password}" @input="${e => this.password = e.target.value}">
       <button type="submit">Register</button>
     </form>
    `
  }
}

customElements.define('chat-auth', ChatAuth);