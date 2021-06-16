// 좌측 디렉토리
class Explorers {
  #explorers = document.getElementsByClassName('explorers')[0];
  constructor() {
    this.#explorers.id = 'explorers';

    this.#init();

    return this.#explorers;
  }

  #init() {
    this.#setTools();
    this.#setLocalFiles();
    this.#explorers.getListElement = this.getListElement;
    this.#explorers.newFile = this.newFile;
    this.#explorers.saveFile = this.saveFile;
    this.#explorers.deleteFile = this.deleteFile;
    this.#explorers.updateFileName = this.updateFileName;
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
    }
    const newFile = this.getListElement(fileName);
    this.append(newFile);

    NotepadStorage.setItem(fileName, '');
  }

  saveFile(target) {
    const text = document.getElementById('editBox').getText();
    NotepadStorage.setItem(target, text);
    alert('저장 완료');
  }

  updateFileName(target, newFileName) {
    const targetFile = document.getElementById('file_' + target);
    targetFile.id = 'file_' + newFileName;
    targetFile.fileName = newFileName;
    targetFile.innerText = newFileName;

    document.getElementById('tabBar').updateTab(target, newFileName);

    this.saveFile(newFileName);
    NotepadStorage.removeItem(target);
  }

  deleteFile(target) {
    NotepadStorage.removeItem(target);
    document.getElementById('file_' + target).parentElement.remove();
    document.getElementById('tabBar').removeTab(target);
  }
}
