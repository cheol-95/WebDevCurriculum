// 탭
class Tab {
  #id;
  #tab;
  #state;
  constructor(id) {
    this.#id = id;
    this.#tab = document.createElement('a');
    this.#tab.className = 'tab';
    this.#tab.innerHTML = this.#id;

    this.#tab.viewing = this.viewing;

    this.#tab.setAttribute('id', `tab_${this.#id}`);
    this.#tab.setAttribute('href', '#');
    this.#addEvent();

    this.#tab.append(new xBox(this.#id));

    return this.#tab;
  }

  #addEvent() {
    // 클릭 시 EditBox 뷰잉 및 포커싱
    this.#tab.addEventListener('click', () => this.viewing());
  }

  viewing() {
    document.getElementById('editBox').setText(this.#id);
  }
}
