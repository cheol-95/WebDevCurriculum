// 파일 관련
class TextFile {
  #file = document.createElement('a');
  constructor(fileName) {
    this.#file.fileName = fileName;
    this.#file.innerHTML = fileName;
    this.#file.className = 'anchor';

    this.#file.setAttribute('id', `file_${fileName}`);
    this.#file.setAttribute('href', `#`);

    this.#addEvent();
    return this.#file;
  }

  #addEvent() {
    this.#file.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      this.#setTab();
      document.getElementById('contextMenu').callMenu(e);
    });

    this.#file.addEventListener('click', () => {
      this.#setTab();
    });
  }

  #setTab() {
    document.getElementById('tabBar').addTab(this.#file.fileName);
  }
}
