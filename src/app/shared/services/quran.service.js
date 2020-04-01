import {Sura, Juz, Ruku, Sajda, HizbQaurter, Manzil} from "../data/quran.data.js";
import XmlService from "./xml.service.js";

class _QuranService {
  getVerseMeta(chapter, verse) {
    const matches = (queryChapter, queryVerse, dataChapter, dataVerse) => dataVerse === 1
      ? dataChapter === queryChapter - 1 && dataVerse === Sura[chapter - 1][2]
      : dataChapter === queryChapter && dataVerse === queryVerse;
    const sajda = Sajda.find(([c, v]) => matches(chapter, verse, c, v));
    const ruku = Ruku.findIndex(([c, v]) => matches(chapter, verse + 1, c, v));
    const juz = Juz.findIndex(([c, v]) => matches(chapter, verse + 1, c, v));
    const hizb = HizbQaurter.findIndex(([c, v]) => matches(chapter, verse + 1, c, v));
    const manzil = Manzil.findIndex(([c, v]) => matches(chapter, verse + 1, c, v));
    return {
      sajda: sajda ? sajda[2] : null,
      ruku: ruku !== -1,
      juz: juz !== -1,
      hizb: hizb !== -1,
      manzil: manzil !== -1
    }
  }

  async getTranslatedChapterName(translationId, chapter) {
    const metadata = await XmlService.readXML(translationId);
    const quranTag = metadata.querySelector(`sura[index="${chapter}"]`);
    return quranTag.getAttribute('name');
  }
}

const QuranService = new _QuranService();
export default QuranService;
