class xBox {
  #id;
  #xBox;
  constructor(id) {
    this.#id = id;
    this.#xBox = document.createElement('img');
    this.#xBox.className = 'xbox';

    this.#xBox.setAttribute('id', `xBox_${id}`);
    this.#xBox.setAttribute('src', dummy.src.xbox);

    this.#addEvent();

    return this.#xBox;
  }

  #addEvent() {
    this.#xBox.addEventListener('click', this.#close);
  }

  #close(e) {
    e.stopPropagation();
    document.getElementById('tabBar').removeTab(this.id.split('_')[1]);
  }
}

// 파일 관련
class File {
  #id;
  #file;
  constructor(id) {
    this.#id = id;
    this.#file = document.createElement('a');
    this.#file.innerHTML = id;
    this.#file.className = 'anchor';

    this.#file.setAttribute('id', `file_${id}`);
    this.#file.setAttribute('href', `#`);

    this.#addEvent();
    return this.#file;
  }

  #addEvent() {
    this.#file.addEventListener('click', () => this.#setTab());
  }

  #setTab() {
    document.getElementById('tabBar').addTab(this.#id);
  }
}
