class TabBar {
  #tabBar = document.getElementsByClassName('tabbar')[0];
  constructor() {
    this.#tabBar.id = 'tabBar';
    this.#tabBar.currentTab = null;
    this.#setHandler(this.#tabBar);

    return this.#tabBar;
  }

  #setHandler(tabBar) {
    tabBar.hasTab = this.hasTab;
    tabBar.addTab = this.addTab;
    tabBar.updateTab = this.updateTab;
    tabBar.removeTab = this.removeTab;
    tabBar.setFocus = this.setFocus;
  }

  addTab(fileName) {
    if (!document.getElementById('tab_' + fileName)) {
      this.append(new Tab(fileName));
    }
    this.setFocus(fileName);
  }

  updateTab(target, newFileName) {
    const targetTab = document.getElementById('tab_' + target);

    this.replaceChild(new Tab(newFileName), targetTab);
    this.setFocus(newFileName);
  }

  removeTab(fileName) {
    document.getElementById('tab_' + fileName).remove();

    const nextTab = this.lastChild ? this.lastChild.id.slice(4) : null;
    this.setFocus(nextTab);
  }

  setFocus(fileName) {
    const newTab = document.getElementById('tab_' + fileName);
    if (newTab === this.currentTab) {
      return;
    }

    if (newTab) {
      newTab.style.background = 'rgb(230, 230, 230)';
    }

    if (this.currentTab && newTab !== this.currentTab) {
      this.currentTab.style.background = 'white';
      this.currentTab.lastChild.setXBox();
    }

    this.currentTab = newTab;
    document.getElementById('editBox').setText(fileName);
  }
}
