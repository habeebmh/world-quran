import '@polymer/paper-spinner/paper-spinner.js';
import {LitElement, html, css} from 'lit-element';
import style from './verses.component.scss';

export class VersesComponent extends LitElement {
  static get properties() {
    return {
      chapter: {type: Number},
      translationLang: {type: String},
      verse: {type: Number},
      verses: {type: Array},
    };
  }

  constructor() {
    super();
    this.chapter = 0;
    this.translationLang = 'english';
    this.verse = -1;
    this.verses = [];
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    ${this.verses.length === 0 ? html`<paper-spinner active></paper-spinner>` : ''}
    ${this.verses.map(verse => verse ? html`
    <quran-translated-text
      scrollToElement="${this.verse === verse.number}"
      arabictext="${verse.arabic}"
      translationtext="${verse.translation}"
      translationlang="${this.translationLang}">
      ${verse.number > 0 ? html`
      <div class="card-top" slot="top-info">
        <span class="bookmark"><quran-bookmark-icon chapter="${this.chapter}" verse="${verse.number}"></quran-bookmark-icon></span>
        <span class="number">${verse.number}</span>
      </div>` : ''}
      ${verse.facts.sajda ? html`<sup slot="super">[سُجود]</sup>` : ''}
    </quran-translated-text>` : '')}
    `;
  }


}
