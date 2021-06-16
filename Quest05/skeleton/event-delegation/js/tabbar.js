class TabBar {
  #tabBar = document.getElementsByClassName('tabbar')[0];
  constructor() {
    this.#tabBar.id = 'tabBar';
    this.#tabBar.currentFile = null;

    this.#addEvent(this.#tabBar);
    this.#setHandler(this.#tabBar);
    return this.#tabBar;
  }

  #addEvent(tabBar) {
    const clickEvent = (e) => {
      if (e.target.id === 'tabBar') {
        return;
      }

      const fileName = e.target.closest('.tab').fileName;
      if (e.target.className === 'indicator') {
        tabBar.removeTab(fileName);
      } else {
        tabBar.setFocus(fileName);
      }
    };

    tabBar.addEventListener('click', clickEvent);
  }

  removeTab(fileName) {
    document.getElementById('tab_' + fileName).remove();
    const nextFile = this.lastChild ? this.lastChild.fileName : null;
    this.setFocus(nextFile);
  }

  #setHandler() {
    tabBar.addTab = this.addTab;
    tabBar.setFocus = this.setFocus;
    tabBar.updateTab = this.updateTab;
    tabBar.removeTab = this.removeTab;
    tabBar.isChildren = this.isChildren;
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
