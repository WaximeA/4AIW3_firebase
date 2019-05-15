import { LitElement, html } from 'lit-element';
import firebase from 'firebase/app';
import 'firebase/database';

class ChatData extends LitElement {

  constructor() {
    super();
    this.data = [];

    this.database = {};
    this.path = "/";

    this.apiKey = "";
    this.authDomain = "";
    this.databaseURL = "";
    this.projectId = "";
    this.storageBucket = "";
    this.messagingSenderId = "";
    this.appId = "";
  }

  static get properties(){
    return {
      data: { type: Array },

      database: { type: Object },
      path: { type: String },

      apiKey: { type: String },
      authDomain: { type: String },
      databaseURL: { type: String },
      projectId: { type: String },
      storageBucket: { type: String },
      messagingSenderId: { type: String },
      appId: { type: String }
    }
  }

  firstUpdated() {
    firebase.initializeApp({
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      databaseURL: this.databaseURL,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      messagingSenderId: this.messagingSenderId,
      appId: this.appId
    });

    this.database = firebase.database();

    this.database.ref(this.path).on('value', (data => this.pathChanged('value', data)));
    this.database.ref(this.path).on('child_added', (data => this.pathChanged('child_added', data)));
    this.database.ref(this.path).on('child_changed', (data => this.pathChanged('child_changed', data)));
    this.database.ref(this.path).on('child_moved', (data => this.pathChanged('child_moved', data)));
    this.database.ref(this.path).on('child_removed', (data => this.pathChanged('child_removed', data)));
  }

  push(data) {
    this.database.ref(this.path).push(data);
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