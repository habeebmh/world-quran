import '@polymer/paper-spinner/paper-spinner.js'
import '../../shared/translated-text/translated-text.component.js';

import {LitElement, html, css} from 'lit-element';
import style from './contents.component.scss';
import Router from "../../router.js";
import {Sura} from "../../shared/data/quran.data.js";


export class ContentsComponent extends LitElement {
  static get properties() {
    return {
      translation: {type: String},
      chapters: {type: Array}
    };
  }

  constructor() {
    super();
    this.translation = '';
    this.chapters = [];
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    ${this.chapters.length === 0 ? html`<paper-spinner></paper-spinner>` : ''}
    ${this.chapters.map(chapter => html`
      <quran-translated-text
          class="link"
          @click="${() => ContentsComponent.goTo(chapter.number)}"
          arabictext="${chapter.arabic}"
          translationtext="${chapter.translation}"
          translationlang="english">
        <div slot="top-info">
          <span class="number">${chapter.number}</span>
        </div>
      </quran-translated-text>`
    )}
    `;
  }

  async firstUpdated() {
    this.chapters = await this._getChapters(this.translation);
  }

  static goTo(chapter) {
    return Router.navigateTo(`/chapter/${chapter}`);
  }

  async _getChapters() {
    return Sura.map((chapter, index) => ({
      arabic: chapter[4],
      translation: chapter[6],
      number: index + 1,
      facts: {
        city: ''
      }
    }));
  }
}
customElements.define('quran-contents', ContentsComponent);
