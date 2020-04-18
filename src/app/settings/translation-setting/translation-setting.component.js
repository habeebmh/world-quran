import {html, LitElement, css} from 'lit-element';
import style from './translation-setting.component.scss';
import SettingsService from "../settings.service.js";
import XmlService from "../../shared/services/xml.service.js";

export class TranslationSettingComponent extends LitElement {
  static get properties() {
    return {
      currentLanguageList: {type: Array},
      translation: {type: String},
      translationList: {type: Array},
    };
  }

  constructor() {
    super();
    this.translation = {};
    this.currentLanguageList = [];
    this.translationList = {}
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <h3>Translations</h3>
    <div class="translations">
      <h4>${this.translation.language} (Current)</h4>
      <label class="container">
        <input
          id="${this.translation.id}"
          @click="${() => this.selectTranslation(this.translation)}"
          type="radio"
          name="translation"
          checked>
        ${this.translation.name} - ${this.translation.writer}
        <span class="checkmark"></span>
      </label><br><br>
      ${this.languageTranslationInputs(this.currentLanguageList)}
      ${Object.entries(this.translationList).map(([language, translations]) => html`
      <h4>${language}</h4>
      ${this.languageTranslationInputs(translations)}
      `)}
    </div>
    `;
  }

  async firstUpdated() {
    this.translation = SettingsService.translation;
    this.translationList = await this.getLanguages();
    this.currentLanguageList = this.translationList[this.translation.language];
    delete this.translationList[this.translation.language];
  }

  selectTranslation(translation) {
    SettingsService.translation = translation;
  }

  languageTranslationInputs(translations) {
    return html`
    ${translations.map(translation => translation.id !== this.translation.id ? html`
      <label class="container">
          <input
            id="${translation.id}"
            @click="${() => this.selectTranslation(translation)}"
            type="radio"
            name="translation">
        ${translation.name} - ${translation.writer}
        <span class="checkmark"></span>
      </label><br><br>` : ''
    )}`
  }

  async getLanguages() {
    const metadata = await XmlService.readXML('translations');
    const translations = {};
    metadata.querySelectorAll('translation').forEach(translation => {
      const meta = this.translationNodeToObject(translation);
      if (translations[meta.language]) {
        translations[meta.language].push(meta);
      } else {
        translations[meta.language] = [meta];
      }
    });
    return translations;
  }

  translationNodeToObject(translationTag) {
    return {
      writer: translationTag.getAttribute('translator'),
      language: translationTag.getAttribute('language'),
      name: translationTag.getAttribute('name'),
      id: translationTag.getAttribute('id')
    };
  }
}
customElements.define('quran-translation-setting', TranslationSettingComponent);
