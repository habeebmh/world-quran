import '../translation-setting/translation-setting.component.js';
import '../../shared/page-header/page-header.component.js';
import '../../shared/app-navigation/app-navigation.component.js';
import '../../shared/body/body.component.js';

import {css, html, LitElement} from 'lit-element';
import style from './settings.component.scss';

export class SettingsComponent extends LitElement {
  static get properties() {
    return {
      arabicFontSize: {type: String},
      translationFontSize: {type: String},
    };
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <quran-page-header>
      <h3>Settings</h3>
    </quran-page-header>
    <div>
        <quran-app-navigation settings></quran-app-navigation>
    </div>
    <quran-body>
      <div class="settings-container">
        <quran-translation-setting></quran-translation-setting>
      </div>
    </quran-body>
    `;
  }

}
customElements.define('quran-settings', SettingsComponent);
