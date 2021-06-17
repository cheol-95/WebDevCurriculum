// 텍스트 박스 관련
class EditBox {
  #editBox = document.getElementsByClassName('editbox')[0];
  constructor() {
    this.#editBox.id = 'editBox';
    this.#editBox.fileName = null;

    this.#init(this.#editBox);
    this.#composition(this.#editBox);
  }

  #init(editBox) {
    editBox.getText = this.getText;
    editBox.setText = this.setText;
    editBox.setEditable = this.setEditable;
  }

  #composition() {
    Object.assign(editBox, new InputEvent());
  }

  getText() {
    return this.innerText;
  }

  setText(fileName) {
    this.fileName = fileName;
    if (fileName) {
      this.innerText = NotepadStorage.getItem(fileName);
      this.setEditable(true);
    } else {
      this.innerText = '';
      this.setEditable(false);
    }
  }

  setEditable(state) {
    this.setAttribute('contenteditable', state);
  }
}

class InputEvent {
  constructor() {
    this.oninput = this.#oninput;
  }

  #oninput = (e) => {
    const indicator = document.getElementById('indicator_' + e.target.fileName);
    indicator.setExclamation();
  };
}
