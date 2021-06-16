class ContextMenu {
  #menu;
  constructor() {
    this.#menu = document.createElement('div');

    this.#menu.id = 'contextMenu';
    this.#menu.targetName = null;

    this.#setEscapeEvent(this.#menu);
    this.#setMenu(this.#menu);

    this.#menu.callMenu = this.callMenu;
    document.body.append(this.#menu);
  }

  #setEscapeEvent(menu) {
    document.addEventListener('click', (e) => {
      menu.style.display = 'none';
    });
  }

  #setMenu(menu) {
    this.#saveMenu(menu);
    this.#saveAsMenu(menu);
    this.#deleteMenu(menu);
  }

  #getMenuElement(text) {
    const newMenu = document.createElement('a');
    newMenu.className = 'menu';
    newMenu.innerText = text;
    newMenu.href = '#';

    return newMenu;
  }

  #saveMenu(menu) {
    const saveFile = () => {
      document.getElementById('explorers').saveFile(menu.targetName);
    };

    const saveMenu = this.#getMenuElement('저장');
    saveMenu.addEventListener('click', saveFile);
    menu.append(saveMenu);
  }

  #saveAsMenu(menu) {
    const saveAsFile = () => {
      const newFileName = prompt('저장할 파일 이름을 입력하세요');
      if (NotepadStorage.getFileNames().includes(newFileName)) {
        alert('이미 존재하는 파일 이름입니다.');
      } else if ('' === newFileName) {
        alert('공백은 허용되지 않습니다.');
      } else {
        document.getElementById('explorers').updateFileName(menu.targetName, newFileName);
      }
    };

    const saveAsMenu = this.#getMenuElement('다른 이름으로 저장');
    saveAsMenu.addEventListener('click', saveAsFile);
    menu.append(saveAsMenu);
  }

  #deleteMenu(menu) {
    const deleteFile = () => {
      if (confirm(`${menu.targetName}을 삭제하시겠습니까?`)) {
        document.getElementById('explorers').deleteFile(menu.targetName);
      }
    };

    const deleteMenu = this.#getMenuElement('삭제');
    deleteMenu.addEventListener('click', deleteFile);
    menu.append(deleteMenu);
  }

  callMenu(e) {
    this.style.display = 'block';
    this.style.left = e.pageX + 'px';
    this.style.top = e.pageY + 'px';
    this.targetName = e.target.fileName;
    console.log('e.target.fileName: ', e.target.fileName);
  }
}
