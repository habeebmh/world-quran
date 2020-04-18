import './bookmarks/bookmarks/bookmarks.component.js';
import './chapter/chapter/chapter.component.js';
import './home/home/home.component.js';
import './settings/settings/settings.component.js';

import {LitElement, html, css} from 'lit-element';
import style from './app.component.scss';

export class AppComponent extends LitElement {
  static get properties() {
    return {
      title: {type: String},
    };
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <div class="content">
      <lit-route path="/" component="quran-home"></lit-route>
      <lit-route path="/bookmarks" component="quran-bookmarks"></lit-route>
      <lit-route path="/settings" component="quran-settings"></lit-route>
      <lit-route path="/chapter/:chapter/:verse?" component="quran-chapter"></lit-route>
      <lit-route><h1>404 Page not found</h1></lit-route>
      <p class="app-footer">
        <span>&copy; Habeeb Hooshmand</span><br>
        <span>Translations from<a href="http://www.tanzil.net/">Tanzil.net</a></span>
      </p>
    </div>
    `;
  }

  firstUpdated() {
  }
}
customElements.define('quran-app', AppComponent);
