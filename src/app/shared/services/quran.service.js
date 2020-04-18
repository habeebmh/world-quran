import {HizbQaurter, Juz, Manzil, Ruku, Sajda, Sura} from "../data/quran.data.js";
import XmlService from "./xml.service.js";

class _QuranService {
  getVerseMeta(chapter, verse) {
    const sajda = Sajda.find(([c, v]) => chapter === c && verse === v);
    const ruku = Ruku.findIndex(([c, v]) => this.matchesNext(chapter, verse, c, v));
    const juz = Juz.findIndex(([c, v]) => this.matchesNext(chapter, verse, c, v));
    const hizb = HizbQaurter.findIndex(([c, v]) => this.matchesNext(chapter, verse, c, v));
    const manzil = Manzil.findIndex(([c, v]) => this.matchesNext(chapter, verse, c, v));
    return {
      sajda: sajda ? sajda[2] : null,
      ruku: ruku > 0 ? ruku : null,
      juz: juz > 0 ? juz : null,
      hizb: hizb > 0 ? hizb : null,
      manzil: manzil > 0 ? manzil : null
    };
  }

  matchesNext(queryChapter, queryVerse, dataChapter, dataVerse) {
    return queryVerse === Sura[queryChapter - 1][2]
      ? dataChapter === queryChapter + 1 && dataVerse === 1
      : dataChapter === queryChapter && dataVerse === queryVerse + 1
  };

  async getTranslatedChapterName(translationId, chapter) {
    const metadata = await XmlService.readXML(translationId);
    const quranTag = metadata.querySelector(`sura[index="${chapter}"]`);
    return quranTag.getAttribute('name');
  }
}

const QuranService = new _QuranService();
export default QuranService;
