export default class EditBox {
  #editBox;
  constructor(editBox, storage) {
    this.#editBox = editBox;
    this.#editBox.fileName = null;
    this.#editBox.storage = storage;

    this.#init(this.#editBox);
    this.#composition(this.#editBox);
    return this.#editBox;
  }

  #init(editBox) {
    editBox.getText = this.getText;
    editBox.setText = this.setText;
    editBox.setEditable = this.setEditable;
  }

  #composition(editBox) {
    Object.assign(editBox, new InputEvent());
  }

  getText() {
    return this.innerText;
  }

  async setText(fileName) {
    this.fileName = fileName;
    if (fileName) {
      this.innerText = await this.storage.getFile(fileName);
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
    const inputEvent = new CustomEvent('setIndicator', {
      bubbles: true,
      detail: { fileName: e.target.fileName },
    });

    e.target.dispatchEvent(inputEvent);
  };
}
