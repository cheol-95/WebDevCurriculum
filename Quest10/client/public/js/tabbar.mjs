import Tab from './tab.mjs';

const dummy = {
  src: {
    xbox: 'https://image.flaticon.com/icons/png/512/0/39.png',
    exclamation: 'https://image.flaticon.com/icons/png/512/3521/3521964.png',
  },
};

export default class TabBar {
  #tabBar;
  constructor(tabBar) {
    this.#tabBar = tabBar;

    this.#init(this.#tabBar);
    this.#composition(this.#tabBar);
    return this.#tabBar;
  }

  #composition(tabBar) {
    Object.assign(tabBar, new TabBarEvent(tabBar));
  }

  #init(tabBar) {
    this.#setTemplate();
    tabBar.currentFile = null;
    tabBar.addTab = this.addTab;
    tabBar.setFocus = this.setFocus;
    tabBar.updateTab = this.updateTab;
    tabBar.removeTab = this.removeTab;
    tabBar.setIndicator = this.setIndicator;
    tabBar.getTabElement = this.getTabElement;
  }

  #setTemplate() {
    this.#tabBar.templateTab = document.createElement('template');
    this.#tabBar.templateTab.innerHTML = `
      <li class="tab">
        <a class="anchor"></a>
        <img class="indicator"></img>
      </li>
    `;
  }

  getTabElement(fileName) {
    return new Tab([fileName, this.templateTab]);
  }

  removeTab(fileName) {
    this.querySelector('#tab_' + fileName).remove();

    const nextFile = this.querySelector('li') ? this.querySelector('li').fileName : null;
    this.setFocus(nextFile);
  }

  addTab(fileName) {
    if (!this.querySelector('#tab_' + fileName)) {
      const newTab = this.getTabElement(fileName);
      this.append(newTab);
    }
    this.setFocus(fileName);
  }

  updateTab(oldFileName, newFileName) {
    const oldTab = this.querySelector('#tab_' + oldFileName);
    this.replaceChild(this.getTabElement(newFileName), oldTab);
    this.setFocus(newFileName);
    oldTab.remove();
  }

  setFocus(fileName) {
    if (fileName === this.currentFile) {
      return;
    }

    const nextTab = this.querySelector('#tab_' + fileName);
    if (nextTab) {
      nextTab.style.background = 'rgb(230, 230, 230)';
    }

    const currentTab = this.querySelector('#tab_' + this.currentFile);
    if (currentTab) {
      currentTab.style.background = 'white';

      const indicator = currentTab.querySelector('img');
      indicator.src = dummy.src.xbox;
      indicator.status = 'xbox';
    }

    this.currentFile = fileName;
    this.nextElementSibling.setText(fileName);
  }

  setIndicator(fileName, state) {
    const indicator = this.querySelector('#indicator_' + fileName);
    indicator.setImg(state);
  }
}

class TabBarEvent {
  constructor(tabBar) {
    tabBar.addEventListener('click', this.#click);
    tabBar.addEventListener('contextmenu', this.#callMenu);
    Object.assign(this, new MouseoverEvent());
  }

  #click = (e) => {
    const clickTabCustomEvent = new CustomEvent('clickTab', {
      bubbles: true,
    });

    e.target.dispatchEvent(clickTabCustomEvent);
  };

  #callMenu = (e) => {
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
}

class MouseoverEvent {
  constructor() {
    this.onmouseover = this.#mouseOver;
  }

  #mouseOver = (e) => {
    if (e.target.className !== 'indicator' || e.target.status === 'xbox') {
      return;
    }
    e.target.src = dummy.src.xbox;
    e.target.addEventListener('mouseout', this.#mouseOut);
  };

  #mouseOut = (e) => {
    e.target.src = dummy.src[e.target.status];
    e.target.removeEventListener('mouseout', this.#mouseOut);
  };
}
