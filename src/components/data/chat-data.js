import { LitElement, html } from 'lit-element';
import firebase from 'firebase/app';
import 'firebase/database';

export class ChatData extends LitElement {
  constructor() {
    super();
    this.database = {};
    this.path = "";
  }

  static get properties() {
    return {
      database: Object,
      path: String,
    }
  }

  firstUpdated() {
    firebase.initializeApp(document.config);
    this.database = firebase.database();

    this.database.ref(this.path).on('value', (data => this.pathChanged('value', data)));
    this.database.ref(this.path).on('child_added', (data => this.pathChanged('child_added', data)));
    this.database.ref(this.path).on('child_changed', (data => this.pathChanged('child_changed', data)));
    this.database.ref(this.path).on('child_moved', (data => this.pathChanged('child_moved', data)));
    this.database.ref(this.path).on('child_removed', (data => this.pathChanged('child_removed', data)));
  }

  pathChanged(event, data) {
    switch (event) {
      case 'value':
        break;
      case 'child_added':
        this.dispatchEvent(new CustomEvent('custom-child-added', { detail: data.val()}));
        break;
      default:
        break;
    }
  }
}

customElements.define('chat-data', ChatData);