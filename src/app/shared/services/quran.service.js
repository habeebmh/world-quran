import {Juz, Ruku, Sajda, HizbQaurter} from "../data/quran.data.js";
import XmlService from "./xml.service.js";

class _QuranService {
  getVerseMeta(chapter, verse) {
    const sajda = Sajda.find(([c, v]) => c === chapter && v === verse);
    const ruku = Ruku.findIndex(([c, v]) => c === chapter && v === verse) + 1;
    const juz = Juz.findIndex(([c, v]) => c === chapter && v === verse) + 1;
    const hizb = HizbQaurter.findIndex(([c, v]) => c === chapter && v === verse) + 1;
    return {
      sajda: sajda ? sajda[2] : null,
      ruku,
      juz,
      hizb
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
