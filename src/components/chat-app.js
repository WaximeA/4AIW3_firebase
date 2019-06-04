import { LitElement, html } from 'lit-element';
import './data/chat-data.js';

class ChatApp extends LitElement {

  constructor() {
    super();
    this.users = [];
  }

  static get properties(){
    return {
      unresolved: {
        type: Boolean,
        reflect: true
      },
      email: { type: String },
      pseudo: { type: String },
      users: { type: Array }

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

  customChildAdded(e) {
    this.users = e.detail;
  }

  render() {
    return html` 
      <chat-data path="users" @custom-child-added="${this.customChildAdded}"></chat-data>
      <slot></slot>
      <ul>
        ${this.users.map(user => html`
          <li>${user.name} ${user.email}</li>
        `)}
      </ul>
    `
  }
}

customElements.define('chat-app', ChatApp);