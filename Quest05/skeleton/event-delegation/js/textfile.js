// 파일 관련
class TextFile {
  #file = document.createElement('a');
  constructor(fileName) {
    this.#file.fileName = fileName;

    this.#file.id = 'file_' + fileName;
    this.#file.href = '#';
    this.#file.className = 'anchor';
    this.#file.innerHTML = fileName;

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
