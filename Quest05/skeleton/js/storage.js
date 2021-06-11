class NotepadStorage {
  constructor() {
    if (!localStorage.getItem('notepad')) {
      localStorage.setItem('notepad', []);
    }
  }

  static getFileNames() {
    return Object.keys(localStorage).reduce((cur, id) => {
      if (id.slice(0, 5) === dummy.fileIdPrefix) {
        cur.push(id.slice(5));
      }
      return cur;
    }, []);
  }

  static getItem(fileName) {
    return localStorage.getItem(dummy.fileIdPrefix + fileName);
  }

  static setItem(fileName, text) {
    localStorage.setItem(dummy.fileIdPrefix + fileName, text);
  }
}
