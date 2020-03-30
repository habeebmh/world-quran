import {css, html, LitElement} from "lit-element";
import style from "./bookmark-icon.component.scss";
import BookmarkService from "../bookmark.service.js";

export class BookmarkIconComponent extends LitElement {
  static get properties() {
    return {
      chapter: {type: Number},
      verse: {type: String},
      bookmarked: {type: Boolean}
    }
  }

  constructor() {
    super();
    this.chapter = 0;
    this.verse = 0;
    this.bookmarked = false;
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
      <span class="bookmark-icon"><quran-material-icon icon="${this.bookmarked ? 'bookmark' : 'bookmark_border'}" @click="${() => this.onClick()}"></quran-material-icon></span>
    `;
  }

  firstUpdated() {
    this.bookmarked = BookmarkService.isBookmarked(this.chapter, this.verse);
  }

  onClick() {
    if (this.bookmarked) {
      this.bookmarked = false;
      BookmarkService.removeBookmark(this.chapter, this.verse);
    } else {
      this.bookmarked = true;
      BookmarkService.addBookmark(this.chapter, this.verse);
    }
  }
}
