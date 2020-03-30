import {LitElement, html, css} from 'lit-element';
import style from './bookmarks.component.scss';
import SettingsService from "../../settings/settings.service.js";
import XmlService from "../../shared/services/xml.service.js";
import QuranService from "../../shared/services/quran.service.js";
import BookmarkService from "../bookmark.service.js";
import Router from "../../router.js";
import {Sura} from "../../shared/data/quran.data.js";

export class BookmarksComponent extends LitElement {
  static get properties() {
    return {
      bookmarks: {type: Object},
      translation: {type: Object},
    };
  }

  constructor() {
    super();
    this.bookmarks = [];
    this.translation = {};
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <quran-page-header>
      <h3>Bookmarks</h3>
    </quran-page-header>
    <div class="navigation">
        <quran-app-navigation bookmarks></quran-app-navigation>
    </div>
    <quran-body>
    ${this.bookmarks.length > 0 ? '' : html`
    <h2>No bookmarks</h2>
    <h3>To Bookmark a verse click the <quran-material-icon icon="bookmark_border"></quran-material-icon> icon.</h3>
    `}
    ${this.bookmarks.map(([chapter, name, verse]) => html`
      <quran-translated-text
          arabictext="${verse.arabic}"
          translationtext="${verse.translation}"
          translationlang="${this.translation.language}">
        <div slot="super">
          ${verse.facts ? html`${verse.facts.sajda ? html`<sup>[سُجود]</sup>` : ''}` : ''}
        </div>
        <div slot="top-info"><h2>${name}</h2><h4><span class="link" @click="${() => this.goToChapter(chapter, verse.number)}">${chapter}:${verse.number}</span></h4></div>
      </quran-translated-text>
    `)}
    </quran-body>
    `;
  }

  async firstUpdated() {
    this.translation = SettingsService.translation;
    this.bookmarks = await this.getBookmarkedVerses();
  }

  async getBookmarkedVerses() {
    const bookmarks = [];
    for (const bookmark of BookmarkService.bookmarks) {
      const name = Sura[bookmark.chapter - 1][4];
      const verseInfo = this.getVerse(bookmark.chapter, bookmark.verse);
      bookmarks.push([bookmark.chapter, await name, await verseInfo]);
    }
    return bookmarks;
  }

  async getVerse(chapter, verse) {
    const queryTranslation = this.translation.id !== 'none';
    const arabicXml = XmlService.readXML('quran-uthmani');
    const translationXml = queryTranslation ? XmlService.readXML(this.translation.id) : null;
    const facts = QuranService.getVerseMeta(chapter, verse);

    return {
      arabic: this.getTextFromVerseNode(await arabicXml, chapter, verse),
      translation: queryTranslation ? this.getTextFromVerseNode(await translationXml, chapter, verse) : '',
      number: verse,
      facts
    };
  }

  getTextFromVerseNode(xml, chapter, verse) {
    return xml.querySelector(`sura[index="${chapter}"]`).querySelector(`aya[index="${verse}"]`).getAttribute('text')
  }

  goToChapter(chapter, verse) {
    Router.navigateTo(`/chapter/${chapter}/${verse}`)
  }
}
