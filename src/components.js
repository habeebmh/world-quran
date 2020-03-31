import {AppComponent} from './app/app.component.js';
import {ChapterComponent} from "./app/chapter/chapter/chapter.component.js";
import {TranslatedTextComponent} from "./app/shared/translated-text/translated-text.component.js";
import {PageHeaderComponent} from "./app/shared/page-header/page-header.component.js";
import {ChapterNavigationComponent} from "./app/chapter/chapter-navigation/chapter-navigation.component.js";
import {AppNavigationComponent} from "./app/shared/app-navigation/app-navigation.component.js";
import {ContentsComponent} from "./app/home/contents/contents.component.js";
import {HomeComponent} from "./app/home/home/home.component.js";
import {SettingsComponent} from "./app/settings/settings/settings.component.js";
import {BodyComponent} from "./app/shared/body/body.component.js";
import {TranslationSettingComponent} from "./app/settings/translation-setting/translation-setting.component.js";
import {BookmarksComponent} from "./app/bookmarks/bookmarks/bookmarks.component.js";
import {MaterialIconComponent} from "./app/shared/material-icon/material-icon.component.js";
import {BookmarkIconComponent} from "./app/bookmarks/bookmark-icon/bookmark-icon.component.js";

customElements.define('quran-app', AppComponent);
customElements.define('quran-app-navigation', AppNavigationComponent);
customElements.define('quran-body', BodyComponent);
customElements.define('quran-bookmarks', BookmarksComponent);
customElements.define('quran-bookmark-icon', BookmarkIconComponent);
customElements.define('quran-chapter', ChapterComponent);
customElements.define('quran-chapter-navigation', ChapterNavigationComponent);
customElements.define('quran-contents', ContentsComponent);
customElements.define('quran-home', HomeComponent);
customElements.define('quran-material-icon', MaterialIconComponent);
customElements.define('quran-page-header', PageHeaderComponent);
customElements.define('quran-settings', SettingsComponent);
customElements.define('quran-translated-text', TranslatedTextComponent);
customElements.define('quran-translation-setting', TranslationSettingComponent);
