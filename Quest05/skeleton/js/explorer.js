// 좌측 디렉토리
class Explorers {
  #explorers;
  constructor() {
    [this.#explorers] = document.getElementsByClassName('explorers');
    this.#explorers.setAttribute('id', `explorers`);

    this.#init();

    return this.#explorers;
  }

  #init() {
    this.#setLocalFiles();
  }

  #setLocalFiles() {
    const localFiles = NotepadStorage.getFileNames();
    localFiles.forEach((fileName) => {
      this.#setFile(fileName);
    });
  }

  #getLi() {
    const newLi = document.createElement('li');
    newLi.className = 'file';
    return newLi;
  }

  #setFile(id) {
    const newLi = this.#getLi();
    const newFile = new File(id);
    newLi.append(newFile);
    this.#explorers.append(newLi);
  }

  #newFile() {
    const id = prompt('파일 이름을 입력하세요');
    const newFile = new File(id, '');
    this.#explorers.append(newFile);
  }
}
