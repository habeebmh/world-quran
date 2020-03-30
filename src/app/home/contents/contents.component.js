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
    ${this.chapters.map(chapter => html`
      <quran-translated-text
          class="link"
          @click="${() => ContentsComponent.goTo(chapter.number)}"
          arabictext="${chapter.arabic}"
          translationtext="${chapter.translation}"
          translationlang="english">
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
