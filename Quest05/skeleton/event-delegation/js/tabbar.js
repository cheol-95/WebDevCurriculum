class TabBar {
  #tabBar = document.getElementsByClassName('tabbar')[0];
  constructor() {
    this.#tabBar.id = 'tabBar';
    this.#tabBar.currentFile = null;

    // this.#addEvent(this.#tabBar);
    this.#setHandler(this.#tabBar);
    this.#composition(this.#tabBar);
    return this.#tabBar;
  }

  #composition(tabBar) {
    Object.assign(tabBar, new TabBarEvent(), new Mouseover());
  }

  #setHandler() {
    tabBar.addTab = this.addTab;
    tabBar.setFocus = this.setFocus;
    tabBar.updateTab = this.updateTab;
    tabBar.removeTab = this.removeTab;
    tabBar.isChildren = this.isChildren;
  }

  removeTab(fileName) {
    document.getElementById('tab_' + fileName).remove();
    const nextFile = this.lastChild ? this.lastChild.fileName : null;
    this.setFocus(nextFile);
  }

  addTab(fileName) {
    if (!this.isChildren(fileName)) {
      this.append(new Tab(fileName));
    }
    this.setFocus(fileName);
  }

  updateTab(target, newFileName) {
    const targetTab = document.getElementById('tab_' + target);
    this.replaceChild(new Tab(newFileName), targetTab);
    this.setFocus(newFileName);
    targetTab.remove();
  }

  setFocus(fileName) {
    if (fileName === this.currentFile) {
      return;
    }

    if (fileName) {
      const nextTab = document.getElementById('tab_' + fileName);
      nextTab.style.background = 'rgb(230, 230, 230)';
    }

    const currentTab = document.getElementById('tab_' + this.currentFile);
    if (currentTab) {
      currentTab.style.background = 'white';
      currentTab.lastChild.setXBox();
    }

    this.currentFile = fileName;
    document.getElementById('editBox').setText(fileName);
  }

  isChildren(fileName) {
    const childNames = Object.values(this.childNodes).map((v) => v.fileName);
    if (childNames.includes(fileName)) {
      return true;
    }
    return false;
  }
}

class TabBarEvent {
  constructor() {
    this.onclick = this.#clickEvent;
    this.oncontextmenu = this.#callMenu;
  }

  #clickEvent = (e) => {
    if (e.target.id === 'tabBar') {
      return;
    }

    const fileName = e.target.closest('.tab').fileName;
    if (e.target.className === 'indicator') {
      e.currentTarget.removeTab(fileName);
    } else {
      e.currentTarget.setFocus(fileName);
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

class Mouseover {
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
