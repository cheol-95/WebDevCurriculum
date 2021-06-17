class TextFile {
  #file = document.createElement('a');
  constructor(fileName) {
    this.#file.fileName = fileName;
    this.#file.id = 'file_' + fileName;
    this.#file.href = '#';
    this.#file.className = 'anchor';
    this.#file.innerHTML = fileName;

    return this.#file;
  }
}
