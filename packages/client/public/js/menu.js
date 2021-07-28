const dummy = {
    menu: {
        save: '저장',
        saveAs: '다른이름으로저장',
        delete: '삭제',
    },
};
export default class ContextMenu extends HTMLElement {
    constructor(menu) {
        super();
        this.menu = menu;
        this.item = Object.values(dummy.menu);
        this.templateMenu = document.createElement('template');
        this.init(this.menu);
        this.composition(this.menu);
        return this.menu;
    }
    init(menu) {
        this.setTemplate();
        this.setMenu(menu);
        menu.targetFile = null;
        menu.callMenu = this.callMenu;
    }
    setTemplate() {
        this.templateMenu.innerHTML = `
      <a class="menu"></a>
    `;
    }
    setMenu(menu) {
        this.item.forEach((menuName) => {
            const newMenu = this.getMenuElement(menuName);
            menu.append(newMenu);
        });
    }
    getMenuElement(menuName) {
        const template = this.templateMenu;
        const clone = template.content.cloneNode(true);
        const a = clone.querySelector('.menu');
        a.id = menuName;
        a.className = 'menu';
        a.innerText = menuName;
        a.href = '#';
        return clone;
    }
    composition(menu) {
        Object.assign(menu, new MenuEvent());
    }
    callMenu(e) {
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
        this.clickEvent = (e) => {
            const clickMenu = e.target.id;
            if (clickMenu === dummy.menu.save) {
                this.saveFile(e);
            }
            else if (clickMenu === dummy.menu.saveAs) {
                this.saveAsFile(e);
            }
            else if (clickMenu === dummy.menu.delete) {
                this.deleteFile(e);
            }
        };
        // @ts-expect-error
        this.onclick = this.clickEvent;
    }
    saveFile(e) {
        const saveFileCustomEvent = new CustomEvent('saveFile', {
            bubbles: true,
            detail: {
                fileName: e.currentTarget.targetFile,
            },
        });
        e.target.dispatchEvent(saveFileCustomEvent);
    }
    saveAsFile(e) {
        const saveAsFileCustomEvent = new CustomEvent('saveAsFile', {
            bubbles: true,
            detail: {
                fileName: e.currentTarget.targetFile,
            },
        });
        e.target.dispatchEvent(saveAsFileCustomEvent);
    }
    deleteFile(e) {
        const deleteFileCustomEvent = new CustomEvent('deleteFile', {
            bubbles: true,
            detail: {
                fileName: e.currentTarget.targetFile,
            },
        });
        e.target.dispatchEvent(deleteFileCustomEvent);
    }
}
