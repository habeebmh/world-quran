import '@polymer/paper-spinner/paper-spinner.js';
import '../../chapter/verse/verse.component.js';
import '../../shared/material-icon/material-icon.component.js';
import '../../shared/app-navigation/app-navigation.component.js';
import '../../shared/page-header/page-header.component.js';

import {LitElement, html, css} from 'lit-element';
import style from './bookmarks.component.scss';
import SettingsService from "../../settings/settings.service.js";
import XmlService from "../../shared/services/xml.service.js";
import QuranService from "../../shared/services/quran.service.js";
import BookmarkService from "../bookmark.service.js";
import Router from "../../router.js";
import {Sura} from "../../shared/data/quran.data.js";
import {ARABIC_TEXT} from "../../shared/constants/constants.js";

export class BookmarksComponent extends LitElement {
  static get properties() {
    return {
      bookmarks: {type: Object},
      loading: {type: Boolean},
      translation: {type: Object},
    };
  }

  constructor() {
    super();
    this.bookmarks = [];
    this.loading = false;
    this.translation = SettingsService.translation;
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
    ${this.loading
      ? html`<paper-spinner active></paper-spinner>`
      : html`
      ${this.bookmarks.length === 0
        ? html`
        <h2>No bookmarks</h2>
        <h3>To Bookmark a verse click the <quran-material-icon icon="bookmark_border"></quran-material-icon> icon.</h3>`
        : html`
        ${this.bookmarks.map(([chapter, name, verse]) => html`
          <quran-verse
            chapter="${chapter}"
            verse="${JSON.stringify(verse)}"
            translation="${JSON.stringify(this.translation)}">
            <div slot="top-info">
              <h2>${name}</h2>
              <h4><span class="link" @click="${() => this.goToChapter(chapter, verse.number)}">${chapter}:${verse.number}</span></h4>
            </div>
          </quran-verse>
        `)}`
      }`
    }
    </quran-body>
    `;
  }

  async firstUpdated() {
    this.bookmarks = await this.getBookmarkedVerses();
  }

  async getBookmarkedVerses() {
    this.loading = true;
    const bookmarks = [];
    for (const bookmark of BookmarkService.bookmarks) {
      const name = Sura[bookmark.chapter - 1][4];
      const verseInfo = this.getVerse(bookmark.chapter, bookmark.verse);
      bookmarks.push([bookmark.chapter, await name, await verseInfo]);
    }
    this.loading = false;
    return bookmarks;
  }

  async getVerse(chapter, verse) {
    const queryTranslation = this.translation.id !== 'none';
    const arabicXml = XmlService.readXML(ARABIC_TEXT);
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
    return xml.querySelector(`
    sura[index = "${chapter}"]`).querySelector(`
    aya[index = "${verse}"]`).getAttribute('text')
  }

  goToChapter(chapter, verse) {
    Router.navigateTo(`/chapter/${chapter}/${verse}`)
  }
}

customElements.define('quran-bookmarks', BookmarksComponent);
