const dummy = {
  fileIdPrefix: 'edit_',
  src: {
    xbox: 'https://image.flaticon.com/icons/png/512/0/39.png',
    exclamation: 'https://image.flaticon.com/icons/png/512/3521/3521964.png',
  },
  menu: {
    save: '저장',
    saveAs: '다른 이름으로 저장',
    delete: '삭제',
  },
};

class Notepad {
  #notepad = document.querySelector('.layout');
  #menu = new ContextMenu();
  #tabBar = new TabBar();
  #editBox = new EditBox();
  #explorer = new Explorer();
  constructor() {
    this.#init();
  }

  #init() {
    this.#notepad.addEventListener('newFile', this.#newFile);
    this.#notepad.addEventListener('saveFile', this.#saveFile);
    this.#notepad.addEventListener('saveAsFile', this.#saveAsFile);
    this.#notepad.addEventListener('deleteFile', this.#deleteFile);
    this.#notepad.addEventListener('callMenu', this.#callMenu);
    this.#notepad.addEventListener('clickFile', this.#clickFile);
    this.#notepad.addEventListener('updateEditBox', this.#updateEditBox);
  }

  #newFile = (e) => {
    const newFileName = prompt('파일 이름을 입력하세요');
    if (!this.#fileNameValidation(newFileName)) {
      return;
    }

    this.#explorer.addFile(newFileName);
    NotepadStorage.setItem(newFileName, '');
  };

  #saveFile = (e) => {
    const { fileName } = e.detail;
    const text = this.#editBox.getText();

    NotepadStorage.setItem(fileName, text);
    this.#tabBar.setIndicator(fileName, 'xbox');
    alert('저장 완료');
  };

  #saveAsFile = (e) => {
    const newFileName = prompt('저장할 파일 이름을 입력하세요');
    if (!this.#fileNameValidation(newFileName)) {
      return;
    }
    const { fileName: oldFileName } = e.detail;
    const text = this.#editBox.getText();

    NotepadStorage.setItem(newFileName, text);
    NotepadStorage.removeItem(oldFileName);

    this.#tabBar.updateTab(oldFileName, newFileName);
    this.#explorer.updateFileName(oldFileName, newFileName);
    alert('다른 이름으로 저장 완료');
  };

  #deleteFile = (e) => {
    const { fileName } = e.detail;

    if (confirm(`${fileName}을 삭제하시겠습니까?`)) {
      this.#tabBar.removeTab(fileName);
      this.#explorer.removeFile(fileName);
      NotepadStorage.removeItem(fileName);
    }
  };

  #callMenu = (e) => {
    this.#tabBar.addTab(e.detail.fileName);
    this.#menu.callMenu(e.detail);
  };

  #clickFile = (e) => {
    const fileName = e.target.fileName;
    this.#tabBar.addTab(fileName);
    this.#editBox.setText(fileName);
  };

  #updateEditBox = (e) => {
    const { fileName } = e.detail;
    this.#tabBar.setIndicator(fileName, 'exclamation');
  };

  #fileNameValidation = (fileName) => {
    if (NotepadStorage.getFileNames().includes(fileName)) {
      alert('이미 존재하는 파일 이름입니다.');
      return false;
    }

    if (fileName === '') {
      alert('공백은 허용되지 않습니다.');
      return false;
    }

    if (fileName) {
      return true;
    }
  };
}
