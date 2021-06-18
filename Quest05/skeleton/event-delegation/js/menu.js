class ContextMenu {
  #item = Object.values(dummy.menu);
  #menu;
  constructor() {
    this.#menu = document.createElement('div');
    this.#menu.id = 'contextMenu';
    this.#menu.targetFile = null;

    this.#init(this.#menu);
    this.#composition(this.#menu);
    document.body.append(this.#menu);
  }

  #init(menu) {
    this.#setMenu(menu);
    menu.callMenu = this.callMenu;
  }

  #getMenuElement(menuName) {
    const newMenu = document.createElement('a');
    newMenu.id = menuName;
    newMenu.className = 'menu';
    newMenu.innerText = menuName;
    newMenu.href = '#';
    return newMenu;
  }

  #setMenu(menu) {
    this.#item.forEach((menuName) => {
      menu.append(this.#getMenuElement(menuName));
    });
  }

  #composition(menu) {
    Object.assign(menu, new MenuEvent(menu));
  }

  callMenu(e) {
    this.style.display = 'block';
    this.style.left = e.pageX + 'px';
    this.style.top = e.pageY + 'px';
    this.targetFile = e.target.id;

    const invisible = () => {
      this.style.display = 'none';
      document.removeEventListener('click', invisible);
    };

    document.addEventListener('click', invisible);
  }
}

class MenuEvent {
  constructor() {
    this.#composition();
    this.onclick = this.#clickEvent;
  }

  #composition() {
    const saveEvent = new SaveFile();
    const saveAsEvent = new SaveAsFile();
    const deleteEvent = new DeleteFile();
    Object.assign(this, saveEvent, saveAsEvent, deleteEvent);
  }

  #clickEvent = (e) => {
    const clickMenu = e.target.id;
    if (clickMenu === dummy.menu.save) {
      this.saveFile(e);
    } else if (clickMenu === dummy.menu.saveAs) {
      this.saveAsFile(e);
    } else if (clickMenu === dummy.menu.delete) {
      this.deleteFile(e);
    }
  };
}

class SaveFile {
  constructor() {
    this.saveFile = this.#saveFile;
  }

  #saveFile(e) {
    const targetFile = e.currentTarget.targetFile;
    const text = document.getElementById('editBox').getText();

    document.getElementById('indicator_' + targetFile).setXBox();
    NotepadStorage.setItem(targetFile, text);
    alert('저장 완료');
  }
}

class SaveAsFile {
  constructor() {
    this.saveAsFile = this.#saveAsFile;
    this.validation = this.validation;
  }

  #saveAsFile(e) {
    const newFileName = prompt('저장할 파일 이름을 입력하세요');
    const targetFile = e.currentTarget.targetFile;
    const text = document.getElementById('editBox').getText();

    if (!this.validation(newFileName)) {
      return;
    }
    NotepadStorage.setItem(newFileName, text);
    NotepadStorage.removeItem(targetFile);
    document.getElementById('explorer').updateFileName(targetFile, newFileName);
    document.getElementById('tabBar').updateTab(targetFile, newFileName);
    alert('다른 이름으로 저장 완료');
  }

  validation = (newFileName) => {
    if (NotepadStorage.getFileNames().includes(newFileName)) {
      alert('이미 존재하는 파일 이름입니다.');
    } else if (newFileName === '') {
      alert('공백은 허용되지 않습니다.');
    } else if (newFileName) {
      return true;
    }
  };
}

class DeleteFile {
  constructor() {
    this.deleteFile = this.#deleteFile;
  }

  #deleteFile(e) {
    const targetFile = e.currentTarget.targetFile;
    if (confirm(`${targetFile}을 삭제하시겠습니까?`)) {
      document.getElementById(targetFile).parentElement.remove();
      document.getElementById('tabBar').removeTab(targetFile);
      NotepadStorage.removeItem(targetFile);
    }
  }
}
