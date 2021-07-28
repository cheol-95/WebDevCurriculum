import Tab from './tab.js';
const dummy = {
    src: {
        xbox: 'https://image.flaticon.com/icons/png/512/0/39.png',
        exclamation: 'https://image.flaticon.com/icons/png/512/3521/3521964.png',
    },
};
export default class TabBar extends HTMLElement {
    constructor(tabBar) {
        super();
        this.currentFile = '';
        this.tabBar = tabBar;
        this.init(this.tabBar);
        this.composition(this.tabBar);
        return this.tabBar;
    }
    composition(tabBar) {
        Object.assign(tabBar, new TabBarEvent(tabBar));
    }
    init(tabBar) {
        this.setTemplate();
        tabBar.currentFile = null;
        tabBar.addTab = this.addTab;
        tabBar.setFocus = this.setFocus;
        tabBar.updateTab = this.updateTab;
        tabBar.removeTab = this.removeTab;
        tabBar.setIndicator = this.setIndicator;
        tabBar.getTabElement = this.getTabElement;
        this.setTabs();
    }
    setTemplate() {
        this.tabBar.templateTab = document.createElement('template');
        this.tabBar.templateTab.innerHTML = `
      <li class="tab">
        <a class="anchor"></a>
        <img class="indicator"></img>
      </li>
    `;
    }
    setTabs() {
        const tabs = JSON.parse(localStorage.edt_tabs);
        if (tabs.length > 0) {
            for (const fileName of tabs) {
                this.tabBar.addTab(fileName);
            }
            const curTab = localStorage.getItem('edt_cur_tab');
            if (curTab !== 'null') {
                this.tabBar.setFocus(curTab);
            }
        }
    }
    getTabElement(fileName) {
        return new Tab([fileName, this.templateTab]);
    }
    removeTab(fileName) {
        this.querySelector(`#tab_${fileName}`).remove();
        const nextFile = this.querySelector('li') ? this.querySelector('li').fileName : null;
        this.setFocus(nextFile);
    }
    async addTab(fileName) {
        await this.setFocus(fileName);
        if (!this.querySelector(`#tab_${fileName}`)) {
            const newTab = this.getTabElement(fileName);
            this.append(newTab);
        }
        const tabs = JSON.parse(localStorage.edt_tabs);
        if (!tabs.includes(fileName) && fileName) {
            tabs.push(fileName);
            localStorage.setItem('edt_tabs', JSON.stringify(tabs));
        }
    }
    updateTab(oldFileName, newFileName) {
        const oldTab = this.querySelector(`#tab_${oldFileName}`);
        this.replaceChild(this.getTabElement(newFileName), oldTab);
        this.setFocus(newFileName);
        oldTab.remove();
    }
    setFocus(fileName) {
        if (fileName === this.currentFile) {
            return;
        }
        const nextTab = this.querySelector(`#tab_${this.fileName}`);
        if (nextTab) {
            nextTab.style.background = 'rgb(230, 230, 230)';
        }
        const currentTab = this.querySelector(`#tab_${this.currentFile}`);
        if (currentTab) {
            currentTab.style.background = 'white';
            const indicator = currentTab.querySelector('img');
            indicator.src = dummy.src.xbox;
            indicator.status = 'xbox';
            localStorage[`edt_f_${this.currentFile}`] = this.nextElementSibling.getText();
        }
        this.currentFile = fileName;
        this.nextElementSibling.setText(fileName);
    }
    setIndicator(fileName, state) {
        const indicator = this.querySelector(`#indicator_${fileName}`);
        indicator.setImg(state);
    }
}
class TabBarEvent {
    constructor(tabBar) {
        this.click = (e) => {
            const clickTabCustomEvent = new CustomEvent('clickTab', {
                bubbles: true,
            });
            e.target.dispatchEvent(clickTabCustomEvent);
        };
        this.callMenu = (e) => {
            e.preventDefault();
            const targetTab = e.target.closest('.tab');
            if (!targetTab) {
                return;
            }
            const callMenuCustomEvent = new CustomEvent('callMenu', {
                bubbles: true,
                detail: {
                    pageX: e.pageX,
                    pageY: e.pageY,
                    fileName: targetTab.fileName,
                },
            });
            e.target.dispatchEvent(callMenuCustomEvent);
        };
        tabBar.addEventListener('click', this.click);
        tabBar.addEventListener('contextmenu', this.callMenu);
        Object.assign(this, new MouseoverEvent());
    }
}
class MouseoverEvent {
    constructor() {
        this.mouseOver = (e) => {
            if (e.target.className !== 'indicator' || e.target.status === 'xbox') {
                return;
            }
            e.target.src = dummy.src.xbox;
            e.target.addEventListener('mouseout', this.mouseOut);
        };
        this.mouseOut = (e) => {
            e.target.src = dummy.src[e.target.status];
            e.target.removeEventListener('mouseout', this.mouseOut);
        };
        this.onmouseover = this.mouseOver;
    }
}
