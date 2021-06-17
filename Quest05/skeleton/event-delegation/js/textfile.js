// 파일 관련
class TextFile {
  #file = document.createElement('a');
  constructor(fileName) {
    this.#file.fileName = fileName;

    this.#file.id = 'file_' + fileName;
    this.#file.href = '#';
    this.#file.className = 'anchor';
    this.#file.innerHTML = fileName;

    this.#init(this.#file);
    this.#composition(this.#file);
    return this.#file;
  }

  #init(file) {
    file.setTab = this.setTab;
  }

  #composition(file) {
    Object.assign(file, new FileEvent());
  }

  setTab() {
    document.getElementById('tabBar').addTab(this.fileName);
  }
}

class FileEvent {
  constructor() {
    this.onclick = this.#click;
    this.oncontextmenu = this.#contextMenu;
  }

  #click = (e) => {
    e.target.setTab();
  };

  #contextMenu = (e) => {
    e.preventDefault();
    e.target.setTab();
    document.getElementById('contextMenu').callMenu(e);
  };
}
