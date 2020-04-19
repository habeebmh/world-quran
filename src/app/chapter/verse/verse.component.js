import '../verse-symbol-tooltip/verse-symbol-tooltip.component.js';
import '../../bookmarks/bookmark-icon/bookmark-icon.component.js';
import '../../shared/translated-text/translated-text.component.js';

import {LitElement, html, css} from 'lit-element';
import style from './verse.component.scss';


export class VerseComponent extends LitElement {
  static get properties() {
    return {
      chapter: {type: Number},
      scrollToVerse: {type: String},
      translation: {type: Object},
      verse: {type: Object},
    };
  }

  constructor() {
    super();
    this.chapter = 0;
    this.scrollToVerse = false;
    this.translation = {};
    this.verse = {};
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
      <quran-translated-text
        scrollToElement="${this.scrollToVerse}"
        arabictext="${this.verse.arabic}"
        translationtext="${this.verse.translation}"
        translationlang="${this.translation.language}">
        ${this.verse.number > 0 ? html`
        <div class="card-top" slot="top-info">
          <span class="bookmark"><quran-bookmark-icon chapter="${this.chapter}" verse="${this.verse.number}"></quran-bookmark-icon></span>
          <span class="number">${this.verse.number}</span>
          <span style="margin-bottom: 10px;"><slot name="more-top-info"></slot></span>
        </div>
        ` : ''}
        <div class="symbol-container" slot="super">
          ${this.verse.facts.sajda ? html`
          <div>
            <quran-verse-symbol-tooltip name="sajdaDialog">
              <div slot="button">
                ${this.verse.facts.sajda === 'obligatory' ? html`<img class="text-symbol" src="assets/wajib.png" alt="واجب‎">` : ''}
                <img class="symbol" src="assets/sajda-transparent.png" alt="سُجود">
              </div>
              <div slot="content">
                <h2>Sujud (سُجود)</h2>
                <p>Indicates a Sujud which is ${this.verse.facts.sajda}.</p>
              </div>
            </quran-verse-symbol-tooltip>
          </div>
          ` : ''}
          ${this.verse.facts.juz ? html`
          <div>
            <quran-verse-symbol-tooltip name="juzDialog">
              <div slot="button">
                <img class="text-symbol" src="assets/juz.png" alt="juz">
              </div>
              <div slot="content">
                <h2>Juz (جُزْءْ)</h2>
                <p>Indicates Juz ${this.verse.facts.juz} has ended. The following verse begins Juz ${this.verse.facts.juz + 1}.</p>
                <p>The Quran is split up into 30 Juz.</p>
              </div>
            </quran-verse-symbol-tooltip>
          </div>
          ` : ''}
          ${this.verse.facts.hizb ? html`
          <div>
            <quran-verse-symbol-tooltip name="hizbDialog">
              <div slot="button">
                <img class="text-symbol" src="assets/hizb.svg" alt="hizb">
              </div>
              <div slot="content">
                <h2>Hizb Quarter (ربع الحزب‎)</h2>
                <p>Indicates Hizb Quarter ${this.verse.facts.hizb} has ended. The next verse begins Hizb Quarter ${this.verse.facts.hizb + 1}.</p>
                <p>There are 8 Hizb Quarters in a Juz.</p>
              </div>
            </quran-verse-symbol-tooltip>
          </div>
          ` : ''}
          ${this.verse.facts.ruku ? html`
          <div>
            <quran-verse-symbol-tooltip name="rukuDialog">
              <div slot="button">
                <img class="symbol" src="assets/ruku.png" alt="ruku">
              </div>
              <div slot="content">
                <h2>Ruku (رُكوع‎)</h2>
                <p>Indicates Ruku ${this.verse.facts.ruku} has ended. The next verse begins Ruku ${this.verse.facts.ruku + 1}.</p>
                <p>Each Ruku is approximately 10 verses.</p>
              </div>
            </quran-verse-symbol-tooltip>
          </div>
          ` : ''}
        </div>
      </quran-translated-text>`;
  }
}

customElements.define('quran-verse', VerseComponent);
