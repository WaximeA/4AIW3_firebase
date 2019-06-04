import { LitElement, html, css } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/auth';

class ChatLogin extends LitElement {

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
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        // handle logout
      } else {
        this.dispatchEvent(new CustomEvent('user-logged', { detail: { user }}));
      }
    });
  }

  handleForm(e) {
    e.preventDefault();

    if ((!this.email || !this.password)) {
      console.error('Email or Password missing');
    }

    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(user => {
      console.info('User logged', user);
    });
  }

  render() {
    return html`
    <form @submit="${this.handleForm}">
       <input type="text" .value="${this.email}" @input="${e => this.email = e.target.value}">
       <input type="password" .value="${this.password}" @input="${e => this.password = e.target.value}">
       <button type="submit">Login</button>
     </form>
    `
  }
}

customElements.define('chat-login', ChatLogin);