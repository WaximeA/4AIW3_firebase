import { LitElement, html } from 'lit-element';
import './chat-data.js';

class ChatApp extends LitElement {

  constructor() {
    super();
    this.data = [];
  }

  static get properties(){
    return {
      unresolved: {
        type: Boolean,
        reflect: true
      },
      email: { type: String },
      pseudo: { type: String },
      data: { type: Array}
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
    this.data = [
      ...this.data,
      e.detail
    ];
  }

  render() {
    return html` 
      <slot></slot>    
      App loaded
    `
  }
}

customElements.define('chat-app', ChatApp);