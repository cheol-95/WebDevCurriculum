// 텍스트 박스 관련
class EditBox {
  #editBox = document.getElementsByClassName('editbox')[0];
  constructor() {
    this.#editBox.id = 'editBox';
    this.#editBox.fileName = null;

    this.#init(this.#editBox);
    this.#addEvent(editBox);
  }

  #init(editBox) {
    editBox.getText = this.getText;
    editBox.setText = this.setText;
    editBox.setEditable = this.setEditable;
  }

  #addEvent() {
    this.#editBox.addEventListener('input', () => {
      const fileName = document.getElementById('tabBar').currentTab.fileName;
      const indicator = document.getElementById('indicator_' + fileName);
      indicator.setExclamation();
    });
  }

  getText() {
    return this.innerText;
  }

  setText(fileName) {
    let text = '',
      state = false;

    if (fileName) {
      text = NotepadStorage.getItem(fileName);
      state = true;
    }

    this.innerText = text;
    this.setEditable(state);
  }

  setEditable(state) {
    this.setAttribute('contenteditable', state);
  }
}
