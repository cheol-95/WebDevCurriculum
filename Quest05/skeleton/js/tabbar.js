class TabBar {
  #tabBar;
  constructor() {
    [this.#tabBar] = document.getElementsByClassName('tabbar');

    this.#tabBar.setAttribute('id', `tabBar`);

    this.#setHandler();

    return this.#tabBar;
  }

  #hasTab(id) {
    const tabName = 'tab_' + id;
    for (let i = 0; i < this.childNodes.length; i++) {
      if (tabName === this.childNodes[i].id) {
        return true;
      }
    }
    return false;
  }

  #setHandler() {
    this.#tabBar.hasTab = this.#hasTab;
    this.#tabBar.addTab = this.addTab;
    this.#tabBar.removeTab = this.removeTab;
  }

  addTab(id) {
    if (!this.hasTab(id)) {
      this.append(new Tab(id));
    }
    document.getElementById('editBox').setText(id);
  }

  removeTab(id) {
    document.getElementById('tab_' + id).remove();

    const nextTab = this.lastChild ? this.lastChild.id.slice(4) : null;
    document.getElementById('editBox').setText(nextTab);
  }
}
