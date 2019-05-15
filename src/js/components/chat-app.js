import { LitElement, html } from 'lit-element';
import './chat-data.js';

class ChatApp extends LitElement {

  constructor() {
    super();
    this.data = [];
  }

  static get properties(){
    return {
      email: { type: String },
      pseudo: { type: String },
      data: { type: Array}
    }
  }

  firstUpdated() {
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
      <chat-data
        id="data"
        path="users"
        apiKey="AIzaSyB31nz4hfCt1BzK78bc7Y8GMS0PKXDCn7w"
        authDomain= "iw3-firebase.firebaseapp.com"
        databaseURL= "https://iw3-firebase.firebaseio.com"
        projectId= "iw3-firebase"
        storageBucket= "iw3-firebase.appspot.com"
        messagingSenderId= "317222753167"
        appId= "1:317222753167:web:1c7745b5a5489eb1"
        @custom-child-added="${this.customChildAdded}"
      ></chat-data>

      <form id="form" @submit="${this.handleForm}">
        <input type="email" name="email" placeholder="email" id="email">
        <input type="text" name="pseudo" placeholder="pseudo" id="pseudo">
        <button type="submit">Subscribe to the newsletter</button>
      </form>
      
      <ul>
         ${this.data.map(item => {return html`<li>${item.pseudo} - ${item.email}</li>`})}
      </ul>
    `
  }
}

customElements.define('chat-app', ChatApp);