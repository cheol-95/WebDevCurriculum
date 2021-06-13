// 텍스트 박스 관련
class EditBox {
  #editBox;
  #currentFile;
  constructor() {
    [this.#editBox] = document.getElementsByClassName('editbox');
    this.#editBox.setAttribute('id', `editBox`);

    this.#editBox.setText = this.setText;
    this.#editBox.setEditable = this.setEditable;

    this.#addEvent();
  }

  #addEvent() {
    this.#editBox.addEventListener('input', () => {
      // 스택, 저장 사용
      console.log(this.#editBox.innerHTML);
    });
  }

  setText(fileName) {
    if (!fileName) {
      this.innerHTML = '';
      this.setEditable(false);
    } else if (this.currentFile !== fileName) {
      document.getElementById('tab_' + fileName).style.background = 'blue';
      this.innerHTML = NotepadStorage.getItem(fileName);
      this.setEditable(true);
    }
    this.currentFile = fileName;
  }

  setCurrentFile;

  setEditable(state) {
    this.setAttribute('contenteditable', state);
  }
}
