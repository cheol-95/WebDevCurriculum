class Explorer {
  #explorer;
  #templateFile;
  constructor([explorer, templateFile]) {
    this.#explorer = explorer;
    this.#templateFile = templateFile;

    this.#init(this.#explorer);
    this.#composition(this.#explorer);
    return this.#explorer;
  }

  #init(explorer) {
    new Tools(explorer);
    this.#setLocalFiles();
    explorer.addFile = this.addFile;
    explorer.removeFile = this.removeFile;
    explorer.getFileElement = this.getFileElement;
    explorer.updateFileName = this.updateFileName;
  }

  #composition(explorer) {
    Object.assign(explorer, new ExplorerEvent());
  }

  #setLocalFiles() {
    const localFiles = NotepadStorage.getFileNames();
    localFiles.forEach((fileName) => {
      this.#setFile(fileName);
    });
  }

  #setFile(fileName) {
    const clone = this.getFileElement(fileName);
    this.#explorer.append(clone);
  }

  addFile(fileName) {
    const clone = this.getFileElement(fileName);
    this.append(clone);
  }

  getFileElement(fileName) {
    const template = this.#templateFile;
    const clone = template.content.cloneNode(true);

    const li = clone.querySelector('li');
    li.id = 'file_' + fileName;

    const a = clone.querySelector('a');
    a.fileName = fileName;
    a.textContent = fileName;
    return clone;
  }

  updateFileName(oldFileName, newFileName) {
    const oldFile = this.querySelector('#file_' + oldFileName);
    this.replaceChild(this.getFileElement(newFileName), oldFile);
    oldFile.remove();
  }

  removeFile(fileName) {
    this.querySelector('#file_' + fileName).remove();
  }
}

class ExplorerEvent {
  constructor() {
    this.onclick = this.#click;
    this.oncontextmenu = this.#callMenu;
  }

  #click = (e) => {
    if (e.target.className === 'anchor') {
      const clickCustomEvent = new CustomEvent('clickFile', {
        bubbles: true,
      });

      e.target.dispatchEvent(clickCustomEvent);
    }
  };

  #callMenu = (e) => {
    e.preventDefault();

    if (e.target.className === 'anchor') {
      const callMenuCustomEvent = new CustomEvent('callMenu', {
        bubbles: true,
        detail: {
          pageX: e.pageX,
          pageY: e.pageY,
          fileName: e.target.fileName,
        },
      });

      e.target.dispatchEvent(callMenuCustomEvent);
    }
  };
}
