import {LitElement, html, css} from 'lit-element';
import style from './home.component.scss';
import SettingsService from "../../settings/settings.service.js";


export class HomeComponent extends LitElement {
  static get properties() {
    return {
      translation: {type: String},
      chapters: {type: Array}
    };
  }

  constructor() {
    super();
    this.translation = SettingsService.translation;
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <quran-page-header>
      <div class="header-graphic"><img src="assets/quran-art.svg" alt="القرآن"></div>
      <h4>The Quran</h4>
    </quran-page-header>
    <div class="navigation">
        <quran-app-navigation home></quran-app-navigation>
    </div>
    <quran-body>
        <quran-contents translation="${this.translation}"></quran-contents>
    </quran-body>
    `;
  }
}
