import {Juz, Ruku, Sajda} from "../data/quran.data.js";
import XmlService from "./xml.service.js";

class _QuranService {
  getVerseMeta(chapter, verse) {
    const sajda = Sajda.find(([c, v]) => c === chapter && v === verse);
    const ruku = Ruku.find(([c, v]) => c === chapter && v === verse);
    const juz = Juz.findIndex(([c, v]) => c === chapter && v === verse);
    return {
      sajda: sajda ? sajda[2] : null,
      ruku: !!ruku,
      juz: juz > 0 ? juz : null,
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
