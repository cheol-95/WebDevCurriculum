// 좌측 디렉토리
class Explorer {
  #explorer = document.querySelector('#explorer');
  constructor() {
    this.#init(this.#explorer);
    this.#composition(this.#explorer);
  }

  #init(explorer) {
    this.#setTools();
    this.#setLocalFiles();
    explorer.addFile = this.addFile;
    explorer.getFileElement = this.getFileElement;
    explorer.updateFileName = this.updateFileName;
    explorer.getListElement = this.getListElement;
  }

  #composition(explorer) {
    Object.assign(explorer, new ExplorerEvent());
  }

  #setTools() {
    const newTools = new Tools();
    this.#explorer.append(newTools);
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

  getFileElement(fileName) {
    const template = document.querySelector('#ex-file');
    const a = template.content.querySelector('a');
    a.id = fileName;
    a.textContent = fileName;

    return document.importNode(template.content, true);
  }

  addFile() {
    const saveValidation = (fileName) => {
      if (fileName === '') {
        alert('공백은 허용되지 않습니다.');
      } else if (NotepadStorage.getFileNames().includes(fileName)) {
        alert('이미 존재하는 이름입니다.');
      } else if (fileName !== null) {
        return true;
      }
    };

    const newFileName = prompt('파일 이름을 입력하세요');
    if (saveValidation(newFileName)) {
      this.append(this.getFileElement(newFileName));
      NotepadStorage.setItem(newFileName, '');
    }
  }

  updateFileName(target, newFileName) {
    const targetFile = document.getElementById(target);
    targetFile.id = newFileName;
    targetFile.fileName = newFileName;
    targetFile.innerText = newFileName;
  }
}

class ExplorerEvent {
  constructor() {
    this.onclick = this.#click;
    this.oncontextmenu = this.#contextMenu;
  }

  #click = (e) => {
    if (e.target.className === 'anchor') {
      document.getElementById('tabBar').addTab(e.target.id);
    }
  };

  #contextMenu = (e) => {
    if (e.target.className === 'anchor') {
      e.preventDefault();
      document.getElementById('tabBar').addTab(e.target.id);
      document.getElementById('contextMenu').callMenu(e);
    }
  };
}
