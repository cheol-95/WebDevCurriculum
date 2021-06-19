class ContextMenu {
  #item = Object.values(dummy.menu);
  #menu = document.getElementById('contextMenu');
  constructor() {
    this.#menu.targetFile = null;

    this.#init(this.#menu);
    this.#composition(this.#menu);
    return this.#menu;
  }

  #init(menu) {
    this.#setMenu(menu);
    menu.callMenu = this.callMenu;
  }

  #setMenu(menu) {
    this.#item.forEach((menuName) => {
      const newMenu = this.#getMenuElement(menuName);
      menu.append(newMenu);
    });
  }

  #getMenuElement(menuName) {
    const template = document.getElementById('menu');
    const clone = template.content.cloneNode(true);

    const a = clone.querySelector('.menu');
    a.id = menuName;
    a.className = 'menu';
    a.innerText = menuName;
    a.href = '#';

    return clone;
  }

  #composition(menu) {
    Object.assign(menu, new MenuEvent());
  }

  callMenu({ pageX, pageY, fileName }) {
    this.style.display = 'block';
    this.style.left = pageX + 'px';
    this.style.top = pageY + 'px';
    this.targetFile = fileName;

    const invisible = () => {
      this.style.display = 'none';
      document.removeEventListener('click', invisible);
    };

    document.addEventListener('click', invisible);
  }
}

class MenuEvent {
  constructor() {
    this.onclick = this.#clickEvent;
  }

  #clickEvent = (e) => {
    const clickMenu = e.target.id;

    if (clickMenu === dummy.menu.save) {
      this.#saveFile(e);
    } else if (clickMenu === dummy.menu.saveAs) {
      this.#saveAsFile(e);
    } else if (clickMenu === dummy.menu.delete) {
      this.#deleteFile(e);
    }
  };

  #saveFile(e) {
    const saveFileCustomEvent = new CustomEvent('saveFile', {
      bubbles: true,
      detail: {
        fileName: e.currentTarget.targetFile,
      },
    });
    e.target.dispatchEvent(saveFileCustomEvent);
  }

  #saveAsFile(e) {
    const saveAsFileCustomEvent = new CustomEvent('saveAsFile', {
      bubbles: true,
      detail: {
        fileName: e.currentTarget.targetFile,
      },
    });
    e.target.dispatchEvent(saveAsFileCustomEvent);
  }

  #deleteFile(e) {
    const deleteFileCustomEvent = new CustomEvent('deleteFile', {
      bubbles: true,
      detail: {
        fileName: e.currentTarget.targetFile,
      },
    });
    e.target.dispatchEvent(deleteFileCustomEvent);
  }
}
