import Cookies from 'js-cookie';

export class _SettingsService {
  constructor() {
    this._expiration = 365;
    this._COOKIE_KEYS = {
      translation: 'translation',
      arabicFontSize: 'arabicFontSize',
      translationFontSize: 'translationFontSize'
    };
  }

   set translation(translation) {
    Cookies.remove(this._COOKIE_KEYS.translation);
    Cookies.set(this._COOKIE_KEYS.translation, JSON.stringify(translation), {expires: this._expiration, path: ''});
  }

   get translation() {
    const cookie = Cookies.get(this._COOKIE_KEYS.translation);
    return cookie ? JSON.parse(cookie) : {
      writer: "Mohammad Habib Shakir",
      language: "English",
      name: "Shakir",
      id: "en.shakir"
    };
  }

   set arabicFontSize(size) {
    Cookies.remove(this._COOKIE_KEYS.arabicFontSize);
    Cookies.set(this._COOKIE_KEYS.arabicFontSize, size, {expires: this._expiration, path: ''});
  }

   get arabicFontSize() {
    return Cookies.get(this._COOKIE_KEYS.arabicFontSize) || '36';
  }

   set translationFontSize(size) {
    Cookies.remove(this._COOKIE_KEYS.translationFontSize);
    Cookies.set(this._COOKIE_KEYS.translationFontSize, size, {expires: this._expiration, path: ''});
  }

   get translationFontSize() {
    return Cookies.get(this._COOKIE_KEYS.translationFontSize) || '26';
  }
}

const SettingsService = new _SettingsService();
export default SettingsService;
