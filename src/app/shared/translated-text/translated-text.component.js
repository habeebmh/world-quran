import {LitElement, html, css} from 'lit-element';
import style from './translated-text.component.scss'
import SettingsService from "../../settings/settings.service.js";

export class TranslatedTextComponent extends LitElement {
  static get properties() {
    return {
      arabicFontSize: {type: String},
      arabicText: {type: String},
      id: {type: String},
      scrollToElement: {type: String},
      translationFontSize: {type: String},
      translationLang: {type: String},
      translationText: {type: String},
    };
  }

  constructor() {
    super();
    this.arabicFontSize = SettingsService.arabicFontSize;
    this.arabicText = '';
    this.id = '';
    this.scrollToElement = '';
    this.translationFontSize = SettingsService.translationFontSize;
    this.translationLang = 'english';
    this.translationText = '';
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
      <div id="${this.id}" class="card">
        <div class="info">
          <slot name="top-info"></slot>
        </div>
        <div>
          <span class="arabic font-size-${this.arabicFontSize}px">
            <p class="info">عربى</p>
            ${this.arabicText} <slot name="super"></slot>
          </span>
          ${this.translationText ? html`
          <hr>
          <span class="translation font-size-${this.translationFontSize}px">
            <p class="info">${this.translationLang.toLowerCase()}</p>
            ${this.translationText}
          </span>` : ''}
        </div>
      </div>
    `;
  }

  updated() {
    if (this.scrollToElement === 'true') {
      setTimeout(() => window.scrollTo(0, this.offsetTop - 100), 0);
    }
  }
}
