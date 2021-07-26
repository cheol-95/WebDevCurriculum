import NotepadStorage from './notepad.js';

interface CustomElement extends HTMLElement {
  fileName: string | null;
  storage: NotepadStorage;

  getText: Function;
  setText: Function;
  setEditable: Function;
}

export default class EditBox {
  private editBox;

  constructor(editBox: CustomElement, storage: NotepadStorage) {
    this.editBox = editBox;
    this.editBox.fileName = null;
    this.editBox.storage = storage;

    this.init(this.editBox);
    this.composition(this.editBox);
    return this.editBox;
  }

  private init(editBox: CustomElement) {
    editBox.getText = this.getText;
    editBox.setText = this.setText;
    editBox.setEditable = this.setEditable;
  }

  private composition(editBox: CustomElement) {
    Object.assign(editBox, new InputEvent());
  }

  getText(): string {
    return this.innerText;
  }

  async setText(fileName: string) {
    this.fileName = fileName;
    if (fileName) {
      this.innerText = await this.storage.getFile(fileName);
      this.setEditable(true);
    } else {
      this.innerText = '';
      this.setEditable(false);
    }
  }

  setEditable(state: boolean) {
    this.setAttribute('contenteditable', state);
  }
}

class InputEvent {
  constructor() {
    this.oninput = this.oninput;
  }

  private oninput = (e: MouseEvent | any) => {
    const inputEvent = new CustomEvent('setIndicator', {
      bubbles: true,
      detail: { fileName: e.target.fileName },
    });

    e.target.dispatchEvent(inputEvent);
  };
}
