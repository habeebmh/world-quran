import '../material-icon/material-icon.component.js'

import {LitElement, html, css} from 'lit-element';
import style from './app-navigation.component.scss';
import Router from "../../router.js";

export class AppNavigationComponent extends LitElement {
  static get properties() {
    return {
      home: {type: Boolean},
      settings: {type: Boolean},
      bookmarks: {type: Boolean}
    }
  }

  constructor() {
    super();
    this.home = false;
    this.settings = false;
    this.bookmarks = false;
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <div class="app-navigation">
      <span class="icon" @click="${() => Router.navigateTo('/')}"><quran-material-icon decoration="${this.home ? 'underline' : ''}" icon="home"></quran-material-icon></span>
      <span class="icon" @click="${() => Router.navigateTo('/bookmarks')}"><quran-material-icon decoration="${this.bookmarks ? 'underline' : ''}" icon="bookmarks"></quran-material-icon></span>
      <span class="icon" @click="${() => Router.navigateTo('/settings')}"><quran-material-icon  decoration="${this.settings ? 'underline' : ''}" icon="settings"></quran-material-icon></span>
    </div>
    `;
  }
}

customElements.define('quran-app-navigation', AppNavigationComponent);
