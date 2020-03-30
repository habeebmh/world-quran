class _XmlService {
  readXML(file) {
    const request = new Request(`book/${file}.xml`);
    return fetch(request)
      .then((results) => results.text())
      .then((str) => new DOMParser().parseFromString(str, 'application/xml'));
  }
}

const XmlService = new _XmlService();
export default XmlService;
