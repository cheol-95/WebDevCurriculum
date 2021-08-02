const dummy: any = {
  menu: {
    save: '저장',
    saveAs: '다른이름으로저장',
    delete: '삭제',
  },
};

export default class ContextMenu {
  targetFile: string | any;

  private menu: any;

  private item: Array<string>;

  private templateMenu: HTMLElement;

  constructor(menu: HTMLElement) {
    this.menu = menu;
    this.item = Object.values(dummy.menu);
    this.templateMenu = document.createElement('template');
    this.init(this.menu);
    this.composition(this.menu);
    return this.menu;
  }

  private init(menu: any) {
    this.setTemplate();
    this.setMenu(menu);
    menu.targetFile = null;
    menu.callMenu = this.callMenu;
  }

  private setTemplate() {
    this.templateMenu.innerHTML = `
      <a class="menu"></a>
    `;
  }

  private setMenu(menu: HTMLElement) {
    this.item.forEach((menuName) => {
      const newMenu = this.getMenuElement(menuName);
      menu.append(newMenu);
    });
  }

  private getMenuElement(menuName: string) {
    const template: any = this.templateMenu;
    const clone = template.content.cloneNode(true);

    const a = clone.querySelector('.menu');
    a.id = menuName;
    a.className = 'menu';
    a.innerText = menuName;
    a.href = '#';

    return clone;
  }

  private composition(menu: HTMLElement) {
    Object.assign(menu, new MenuEvent());
  }

  callMenu(e: MouseEvent | any) {
    const { pageX, pageY, fileName } = e;

    this.style.display = 'block';
    this.style.left = `${pageX}px`;
    this.style.top = `${pageY}px`;
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
    // @ts-expect-error
    this.onclick = this.clickEvent;
  }

  private clickEvent = (e: MouseEvent | any) => {
    const clickMenu = e.target.id;

    if (clickMenu === dummy.menu.save) {
      this.saveFile(e);
    } else if (clickMenu === dummy.menu.saveAs) {
      this.saveAsFile(e);
    } else if (clickMenu === dummy.menu.delete) {
      this.deleteFile(e);
    }
  };

  private saveFile(e: MouseEvent | any) {
    const saveFileCustomEvent = new CustomEvent('saveFile', {
      bubbles: true,
      detail: {
        fileName: e.currentTarget.targetFile,
      },
    });
    e.target.dispatchEvent(saveFileCustomEvent);
  }

  private saveAsFile(e: MouseEvent | any) {
    const saveAsFileCustomEvent = new CustomEvent('saveAsFile', {
      bubbles: true,
      detail: {
        fileName: e.currentTarget.targetFile,
      },
    });
    e.target.dispatchEvent(saveAsFileCustomEvent);
  }

  private deleteFile(e: MouseEvent | any) {
    const deleteFileCustomEvent = new CustomEvent('deleteFile', {
      bubbles: true,
      detail: {
        fileName: e.currentTarget.targetFile,
      },
    });
    e.target.dispatchEvent(deleteFileCustomEvent);
  }
}
