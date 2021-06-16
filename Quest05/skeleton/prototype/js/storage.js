class NotepadStorage {
  static makeFileName(fileName) {
    return dummy.fileIdPrefix + fileName;
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
    const parsedName = this.makeFileName(fileName);
    return localStorage.getItem(parsedName);
  }

  static setItem(fileName, text) {
    const parsedName = this.makeFileName(fileName);
    localStorage.setItem(parsedName, text);
  }

  static removeItem(fileName) {
    const parsedName = this.makeFileName(fileName);
    localStorage.removeItem(parsedName);
  }
}

// saveAsFile
