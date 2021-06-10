const dummy = {
  filenamePrefix: 'edit_',
  src: {
    xbox: 'https://image.flaticon.com/icons/png/512/1828/1828843.png',
  },
};

// 뷰 리사이징 이벤트
const init = () => {
  (() => {
    const setViewSize = () => {
      const layout = document.getElementsByClassName('layout')[0];
      layout.style.height = window.innerHeight + 'px';
      layout.style.width = window.innerWidth + 'px';
    };

    setViewSize();
    window.addEventListener('resize', setViewSize);
  })();
};

class Notepad {
  #tabBar;
  #editBox;
  #explorers;
  constructor() {
    this.#tabBar = new TabBar();
    this.#editBox = new EditBox();
    this.#explorers = new Explorers();
  }
}

class xBox {
  #xBox;
  #name;
  constructor(name) {
    this.#name = name;
    this.#xBox = document.createElement('img');
    this.#xBox.className = 'xbox';

    this.#xBox.setAttribute('id', `xBox_${name}`);
    this.#xBox.setAttribute('src', dummy.src.xbox);

    this.#addEvent();

    return this.#xBox;
  }

  #addEvent() {
    this.#xBox.addEventListener('click', () => this.#close());
  }

  #close() {
    document.getElementById('tabBar').removeTab(this.#name);
  }
}

// 탭
class Tab {
  #name;
  #tab;
  constructor(name) {
    this.#name = name;
    this.#tab = document.createElement('a');
    this.#tab.className = 'tab';
    this.#tab.innerHTML = this.#name;
    this.#tab.viewing = this.viewing;

    this.#tab.setAttribute('id', `tab_${this.#name}`);
    this.#tab.setAttribute('href', '#');
    this.#addEvent();

    this.#tab.append(new xBox(this.#name));

    return this.#tab;
  }

  #addEvent() {
    // 클릭 시 EditBox 뷰잉 및 포커싱
    this.#tab.addEventListener('click', () => this.viewing());
  }

  viewing() {
    const editBox = document.getElementById('editBox');
    editBox.setText(this.#name);
  }
}

class TabBar {
  #tabBar;
  tabList = [];
  constructor() {
    [this.#tabBar] = document.getElementsByClassName('tabbar');
    this.#tabBar.setAttribute('id', `tabBar`);
    this.#tabBar.createTab = this.createTab;
    this.#tabBar.removeTab = this.removeTab;
    this.#tabBar.hasTab = this.#hasTab;
    return this.#tabBar;
  }

  #hasTab(name) {
    const tabName = 'tab_' + name;
    for (let i = 0; i < this.childNodes.length; i++) {
      if (tabName === this.childNodes[i].id) {
        return true;
      }
    }
    return false;
  }

  createTab(name) {
    if (!this.hasTab(name)) {
      this.append(new Tab(name));
    }
    document.getElementById('editBox').setText(name);
  }

  removeTab(name) {
    document.getElementById(`tab_${name}`).remove();
  }
}

// 텍스트 박스 관련
class EditBox {
  #editBox;
  currentFile;
  constructor() {
    [this.#editBox] = document.getElementsByClassName('editbox');
    this.#editBox.setAttribute('id', `editBox`);
    this.#editBox.setText = this.setText;
    this.#editBox.setEditable = this.setEditable;

    this.#addEvent();
  }

  #addEvent() {
    this.#editBox.addEventListener('input', () => {
      console.log('변화발생');
    });
  }

  setText(fileName) {
    if (this.currentFile !== fileName) {
      this.innerHTML = NotepadStorage.getItem(fileName);
      this.setEditable(true);
    } else if (fileName) {
      this.setEditable(false);
    }

    this.currentFile = fileName;
  }

  setEditable(state) {
    this.setAttribute('contenteditable', state);
  }
}

// 파일 관련
class File {
  #name;
  #file;
  constructor(name) {
    this.#name = name;
    this.#file = document.createElement('a');
    this.#file.innerHTML = name;
    this.#file.className = 'anchor';

    this.#file.setAttribute('id', `file_${name}`);
    this.#file.setAttribute('href', `#`);

    this.#addEvent();
    return this.#file;
  }

  #addEvent() {
    this.#file.addEventListener('click', () => this.#setTab());
  }

  #setTab() {
    document.getElementById('tabBar').createTab(this.#name);
  }
}

// 좌측 디렉토리
class Explorers {
  #explorers;
  constructor() {
    [this.#explorers] = document.getElementsByClassName('explorers');
    this.#explorers.setAttribute('id', `explorers`);

    this.#init();

    return this.#explorers;
  }

  #init() {
    this.#setLocalFiles();
  }

  #setLocalFiles() {
    const localFiles = NotepadStorage.getFileNames();
    localFiles.forEach((fileName) => {
      this.#setFile(fileName);
    });
  }

  #getLi() {
    const newLi = document.createElement('li');
    newLi.className = 'file';
    return newLi;
  }

  #setFile(name) {
    const newLi = this.#getLi();
    const newFile = new File(name);
    newLi.append(newFile);
    this.#explorers.append(newLi);
  }

  #newFile() {
    const name = prompt('파일 이름을 입력하세요');
    const newFile = new File(name, '');
    this.#explorers.append(newFile);
  }
}

class NotepadStorage {
  static getFileNames() {
    return Object.keys(localStorage).reduce((cur, name) => {
      if (name.slice(0, 5) === dummy.filenamePrefix) {
        cur.push(name.slice(5));
      }
      return cur;
    }, []);
  }

  static getItem(fileName) {
    return localStorage.getItem(dummy.filenamePrefix + fileName);
  }

  static setItem(fileName, text) {
    localStorage.setItem(dummy.filenamePrefix + fileName, text);
  }
}
