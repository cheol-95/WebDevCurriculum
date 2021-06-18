class TabBar {
  status;
  #tabBar = document.getElementById('tabBar');
  constructor() {
    this.#tabBar.currentFile = null;

    this.status = null;
    this.#setHandler(this.#tabBar);
    this.#composition(this.#tabBar);
    return this.#tabBar;
  }

  #composition(tabBar) {
    Object.assign(tabBar, new TabBarEvent());
  }

  #setHandler(tabBar) {
    tabBar.addTab = this.addTab;
    tabBar.setFocus = this.setFocus;
    tabBar.updateTab = this.updateTab;
    tabBar.removeTab = this.removeTab;
    tabBar.getTabElement = this.getTabElement;
  }

  getTabElement(fileName) {
    return new Tab(fileName);
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

  updateTab(targetName, newFileName) {
    const targetTab = this.querySelector('#' + targetName);
    this.replaceChild(this.getTabElement(newFileName), targetTab);
    this.setFocus(newFileName);
    targetTab.remove();
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
    document.getElementById('editBox').setText(fileName);
  }
}

class TabBarEvent {
  constructor() {
    this.onclick = this.#clickEvent;
    this.oncontextmenu = this.#callMenu;
    Object.assign(this, new MouseoverEvent());
  }

  #clickEvent = (e) => {
    const fileName = e.target.closest('.tab').fileName;

    if (e.target.className === 'anchor') {
      e.currentTarget.setFocus(fileName);
    } else if (e.target.className === 'indicator') {
      e.currentTarget.removeTab(fileName);
    }
  };

  #callMenu = (e) => {
    const targetTab = e.target.closest('.tab');
    if (targetTab) {
      e.preventDefault();
      document.getElementById('tabBar').setFocus(targetTab.fileName);
      document.getElementById('contextMenu').callMenu(e);
    }
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
