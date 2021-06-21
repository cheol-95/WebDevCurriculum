class Tab {
  #tab;
  constructor(fileName) {
    this.#tab = this.#clone();

    this.#init(fileName);
    return this.#tab;
  }

  #clone() {
    const template = document.querySelector('#tb-tab');
    return template.content.cloneNode(true);
  }

  #init(fileName) {
    this.#setList(fileName);
    this.#setAnchor(fileName);
    this.#setIndicator(fileName);
  }

  #setList(fileName) {
    const li = this.#tab.querySelector('li');
    li.id = 'tab_' + fileName;
    li.fileName = fileName;
  }

  #setAnchor(fileName) {
    const anchor = this.#tab.querySelector('a');
    anchor.href = '#';
    anchor.textContent = fileName;
  }

  #setIndicator(fileName) {
    const indicator = this.#tab.querySelector('img');
    indicator.id = 'indicator_' + fileName;
    indicator.src = dummy.src.xbox;
    indicator.status = 'xbox';

    indicator.setImg = (state) => {
      if (state === 'xbox' && indicator.status === 'exclamation') {
        indicator.src = dummy.src.xbox;
        indicator.status = 'xbox';
      } else if (state === 'exclamation' && indicator.status === 'xbox') {
        indicator.src = dummy.src.exclamation;
        indicator.status = 'exclamation';
      }
    };
  }
}
