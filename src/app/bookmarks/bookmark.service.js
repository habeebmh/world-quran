import Cookies from 'js-cookie';

class _BookmarkService {

  constructor() {
    this._cookieKey = 'bookmarks';
    this._expiration = 365;
  }

  addBookmark(chapter, verse) {
    const {bookmarks} = this;
    bookmarks.push({chapter, verse});
    this.bookmarks = bookmarks;
  }

  removeBookmark(chapter, verse) {
    console.log(this.bookmarks.filter(bookmark => bookmark.chapter !== chapter && bookmark.verse !== verse));
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.chapter !== chapter && bookmark.verse !== verse);
  }

  isBookmarked(chapter, verse) {
    const {bookmarks} = this;
    return bookmarks.find(value => value.chapter === chapter && value.verse === verse);
  }

  get bookmarks() {
    const cookie = Cookies.get(this._cookieKey);
    return cookie ? JSON.parse(cookie) : [];
  }

  set bookmarks(bookmarks) {
    Cookies.remove(this._cookieKey);
    Cookies.set(
      this._cookieKey,
      JSON.stringify(bookmarks),
      {expires: this._expiration, path: ''}
    );
  }

}

const BookmarkService = new _BookmarkService();
export default BookmarkService;
