import '@polymer/paper-spinner/paper-spinner.js';

import {LitElement, html, css} from 'lit-element';
import style from './chapter.component.scss';
import SettingsService from "../../settings/settings.service.js";
import XmlService from "../../shared/services/xml.service.js";
import {Sura} from "../../shared/data/quran.data.js";
import QuranService from "../../shared/services/quran.service.js";


export class ChapterComponent extends LitElement {
  static get properties() {
    return {
      chapter: {type: Number},
      translation: {type: Object},
      verse: {type: Number},
      verses: {type: Array}
    };
  }

  constructor() {
    super();
    this.translation = SettingsService.translation;
    this.chapter = 0;
    this.chapterNameArabic = '';
    this.chapterNameTranslation = '';
    this.verse = 0;
    this.verses = [];
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <quran-page-header>
      <h4>Chapter #${this.chapter}</h4>
      <h2 class="arabic">${this.chapterNameArabic}</h2>
      ${this.translation.language === 'English' ? html`<h3>${this.chapterNameTranslation}</h3>` : ''}
    </quran-page-header>
    <div class="navigation">
      <quran-app-navigation></quran-app-navigation>
      <quran-chapter-navigation
        chapter="${this.chapter}"
        currentChapterName="${this.chapterNameArabic}"
        translation="${JSON.stringify(this.translation)}"
        verse="${this.verse}">
      </quran-chapter-navigation>
    </div>
    <quran-body>
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
    </quran-body>
    `;
  }

  async firstUpdated() {
    const chapterInfo = await this._getChapter(this.translation.id, this.chapter);
    this.chapterNameArabic = chapterInfo.arabic;
    this.chapterNameTranslation = chapterInfo.translation;
    this.verses = await (chapterInfo.verses);
  }

  async _getChapter(translation, chapter) {
    const queryTranslation = translation && translation !== 'none';

    const arabicXml = await XmlService.readXML('quran-uthmani');
    const translationXml = queryTranslation ? await XmlService.readXML(translation) : null;

    const arabicChapter = arabicXml.querySelector(`sura[index="${chapter}"]`);
    const translationChapter = translationXml ? translationXml.querySelector(`sura[index="${chapter}"]`) : null;
    const verseCount = arabicChapter.querySelectorAll('aya').length;

    const verses = this._zipVerses(chapter, verseCount, arabicChapter, translationChapter);

    const arabicTitle = arabicChapter.getAttribute('name');
    const translatedTitle = Sura[chapter - 1][6];

    return {
      verses,
      arabic: arabicTitle,
      translation: translatedTitle,
    };
  }

  async _zipVerses(chapter, verseCount, arabicXml, translationXml) {
    const verses = Array(verseCount);
    for (let verseId = 1; verseId <= verseCount; verseId += 1) {
      const arabicVerse = arabicXml.querySelector(`aya[index="${verseId}"]`);
      const translationVerse = translationXml ? translationXml.querySelector(`aya[index="${verseId}"]`).getAttribute('text') : '';
      const facts = QuranService.getVerseMeta(chapter, verseId);

      if (arabicVerse.hasAttribute('bismillah')) {
        verses[0] = {
          arabic: arabicVerse.getAttribute('bismillah'),
          translation: '',
          number: '',
          facts: {}
        };
      }

      verses[verseId] = {
        arabic: arabicVerse.getAttribute('text'),
        translation: translationVerse,
        number: verseId,
        facts
      };
    }
    return verses
  }
}
