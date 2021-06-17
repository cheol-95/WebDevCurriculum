class Tab {
  #tab = document.createElement('a');
  constructor(fileName) {
    this.#tab.className = 'tab';
    this.#tab.fileName = fileName;

    this.#tab.id = 'tab_' + fileName;
    this.#tab.href = '#';

    this.#init();
    return this.#tab;
  }

  #init() {
    this.#setTabName();
    this.#setIndicator();
    this.#addEvent();
  }

  #addEvent() {
    this.#tab.addEventListener('contextmenu', this.#callMenu);
  }

  #callMenu(e) {
    document.getElementById('tabBar').setFocus(e.target.fileName);
    document.getElementById('contextMenu').callMenu(e);
  }

  #setTabName() {
    const newSpan = document.createElement('span');
    newSpan.innerText = this.#tab.fileName;
    newSpan.fileName = this.#tab.fileName;
    this.#tab.append(newSpan);
  }

  #setIndicator() {
    this.#tab.append(new Indicator(this.#tab.fileName));
  }
}

class Indicator {
  #indicator;
  constructor(fileName) {
    this.#indicator = document.createElement('img');
    this.#indicator.className = 'indicator';

    this.#indicator.id = 'indicator_' + fileName;
    this.#indicator.src = dummy.src.xbox;
    this.#indicator.status = 'xbox';

    this.#init();
    this.#composition(this.#indicator);
    return this.#indicator;
  }

  #init() {
    this.#indicator.setExclamation = this.setExclamation;
    this.#indicator.setXBox = this.setXBox;
  }

  #composition(indicator) {
    Object.assign(indicator, new Mouseover());
  }

  setExclamation() {
    if (this.status === 'xbox') {
      this.src = dummy.src.exclamation;
      this.status = 'exclamation';
    }
  }

  setXBox() {
    if (this.status === 'exclamation') {
      this.src = dummy.src.xbox;
      this.status = 'xbox';
    }
  }
}

class Mouseover {
  constructor() {
    this.onmouseover = this.#mouseOver;
  }

  #mouseOver = (e) => {
    if (e.target.status === 'xbox') {
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
