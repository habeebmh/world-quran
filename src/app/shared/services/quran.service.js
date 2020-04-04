import {Sura, Juz, Ruku, Sajda, HizbQaurter, Manzil} from "../data/quran.data.js";
import XmlService from "./xml.service.js";

class _QuranService {
  getVerseMeta(chapter, verse) {
    const matchesNext = (queryChapter, queryVerse, dataChapter, dataVerse) => {
      if (queryVerse === Sura[chapter - 1][2]) {
        console.log(queryChapter, queryVerse, dataChapter, dataVerse);
      }
      return queryVerse === Sura[chapter - 1][2]
        ? dataChapter === queryChapter + 1 && dataVerse === 1
        : dataChapter === queryChapter && dataVerse === queryVerse + 1
    };
    const sajda = Sajda.find(([c, v]) => chapter === c && verse === v);
    const ruku = Ruku.findIndex(([c, v]) => matchesNext(chapter, verse, c, v));
    const juz = Juz.findIndex(([c, v]) => matchesNext(chapter, verse, c, v));
    const hizb = HizbQaurter.findIndex(([c, v]) => matchesNext(chapter, verse, c, v));
    const manzil = Manzil.findIndex(([c, v]) => matchesNext(chapter, verse, c, v));
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
