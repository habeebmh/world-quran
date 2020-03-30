import {LitElement, html, css} from 'lit-element';
import style from './chapter-navigation.component.scss';
import Router from "../../router.js";
import {Sura} from "../../shared/data/quran.data.js";

export class ChapterNavigationComponent extends LitElement {
  static get properties() {
    return {
      chapter: {type: Number},
      translation: {type: Object},
      leftChapterName: {type: String},
      rightChapterName: {type: String},
    };
  }

  constructor() {
    super();
    this.translation = {};
    this.leftChapterName = '';
    this.rightChapterName = '';
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
        <div class="chapter-navigation">
            <button @click="${() => ChapterNavigationComponent.navigate(this.leftChapterNumber)}" class="chapter-navigation-item left">
                &larr; ${this.leftChapterNumber} ${this.leftChapterName}
            </button>
            <button @click="${() => ChapterNavigationComponent.navigate(this.rightChapterNumber)}" class="chapter-navigation-item right">
                ${this.rightChapterNumber} ${this.rightChapterName} &rarr;
            </button>
        <div>
    </div>
    `;
  }

  async firstUpdated() {
    await this.setChapterNames();
  }

  get rightChapterNumber() {
    return this.nextChapter // this.translationMeta.direction === 'ltr' ? this.nextChapter : this.previousChapter;
  }

  get leftChapterNumber() {
    return this.previousChapter // this.translationMeta.direction === 'ltr' ? this.previousChapter : this.nextChapter;
  }

  get previousChapter() {
    return this.chapter > 1 ? this.chapter - 1 : 114;
  }

  get nextChapter() {
    return this.chapter < 114 ? this.chapter + 1 : 1;
  }

  async setChapterNames() {
    this.leftChapterName = Sura[this.leftChapterNumber - 1][4];
    this.rightChapterName = Sura[this.rightChapterNumber - 1][4];
  }

  static navigate(chapter) {
    Router.navigateTo(`/chapter/${chapter}`);
  }

}
