// 좌측 디렉토리
class Explorers {
  #explorers = document.getElementsByClassName('explorers')[0];
  constructor() {
    this.#explorers.id = 'explorers';

    this.#init();
    // return this.#explorers;
  }

  #init() {
    this.#setTools();
    this.#setLocalFiles();
    this.#explorers.newFile = this.newFile;
    this.#explorers.updateFileName = this.updateFileName;
    this.#explorers.getListElement = this.getListElement;
  }

  #setTools() {
    const newTools = new Tools();
    this.#explorers.append(newTools);
  }

  #setLocalFiles() {
    const localFiles = NotepadStorage.getFileNames();
    localFiles.forEach((fileName) => {
      this.#setFile(fileName);
    });
  }

  getListElement(fileName) {
    const newList = document.createElement('li');
    newList.className = 'file';

    const newFile = new TextFile(fileName);
    newList.append(newFile);

    return newList;
  }

  #setFile(fileName) {
    const newFile = this.getListElement(fileName);
    this.#explorers.append(newFile);
  }

  newFile() {
    const fileName = prompt('파일 이름을 입력하세요');
    if (fileName === '') {
      alert('공백은 허용되지 않습니다.');
      return;
    } else if (fileName === null) {
      return;
    }
    const newFile = this.getListElement(fileName);
    this.append(newFile);
    NotepadStorage.setItem(fileName, '');
  }

  updateFileName(target, newFileName) {
    const targetFile = document.getElementById('file_' + target);
    targetFile.id = 'file_' + newFileName;
    targetFile.fileName = newFileName;
    targetFile.innerText = newFileName;
  }
}
