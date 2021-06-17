// 좌측 디렉토리
class Explorers {
  #explorers = document.getElementsByClassName('explorers')[0];
  constructor() {
    this.#explorers.id = 'explorers';
    this.#init(this.#explorers);
    this.#composition(this.#explorers);
  }

  #init(explorers) {
    this.#setTools();
    this.#setLocalFiles();
    explorers.newFile = this.newFile;
    explorers.updateFileName = this.updateFileName;
    explorers.getListElement = this.getListElement;
  }

  #composition(explorers) {
    Object.assign(explorers, new ExplorersEvent());
  }

  #setTools() {
    const newTools = new Tools();
    this.#explorers.append(newTools);
  }

  #setLocalFiles() {
    const localFiles = NotepadStorage.getFileNames();
    localFiles.forEach((fileName) => {
      this.#setFile(fileName);
    });
  }

  #setFile(fileName) {
    const newFile = this.getListElement(fileName);
    this.#explorers.append(newFile);
  }

  getListElement(fileName) {
    const newList = document.createElement('li');
    const newFile = new TextFile(fileName);

    newList.className = 'file';
    newList.append(newFile);
    return newList;
  }

  newFile() {
    const validation = (fileName) => {
      if (fileName === '') {
        alert('공백은 허용되지 않습니다.');
      } else if (NotepadStorage.getFileNames().includes(fileName)) {
        alert('이미 존재하는 이름입니다.');
      } else if (fileName !== null) {
        return true;
      }
    };

    const fileName = prompt('파일 이름을 입력하세요');
    if (validation(fileName)) {
      const newFile = this.getListElement(fileName);
      this.append(newFile);
      NotepadStorage.setItem(fileName, '');
    }
  }

  updateFileName(target, newFileName) {
    const targetFile = document.getElementById('file_' + target);
    targetFile.id = 'file_' + newFileName;
    targetFile.fileName = newFileName;
    targetFile.innerText = newFileName;
  }
}

class ExplorersEvent {
  constructor() {
    this.onclick = this.#click;
    this.oncontextmenu = this.#contextMenu;
  }

  #click = (e) => {
    if (e.target.className === 'anchor') {
      document.getElementById('tabBar').addTab(e.target.fileName);
    }
  };

  #contextMenu = (e) => {
    if (e.target.className === 'anchor') {
      e.preventDefault();
      document.getElementById('tabBar').addTab(e.target.fileName);
      document.getElementById('contextMenu').callMenu(e);
    }
  };
}
