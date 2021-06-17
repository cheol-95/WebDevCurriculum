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
    return this.#indicator;
  }

  #init() {
    this.#indicator.setExclamation = this.setExclamation;
    this.#indicator.setXBox = this.setXBox;
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
