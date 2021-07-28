export default class EditBox extends HTMLElement {
    constructor(editBox, storage) {
        super();
        this.editBox = editBox;
        this.editBox.fileName = null;
        this.editBox.storage = storage;
        this.init(this.editBox);
        this.composition(this.editBox);
        // @ts-expect-error
        return this.editBox;
    }
    init(editBox) {
        editBox.getText = this.getText;
        editBox.setText = this.setText;
        editBox.setEditable = this.setEditable;
    }
    composition(editBox) {
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
        }
        else {
            this.innerText = '';
            this.setEditable(false);
        }
    }
    setEditable(state) {
        // @ts-expect-error
        this.setAttribute('contenteditable', state);
    }
}
class InputEvent {
    constructor() {
        this.oninput = (e) => {
            const inputEvent = new CustomEvent('setIndicator', {
                bubbles: true,
                detail: { fileName: e.target.fileName },
            });
            e.target.dispatchEvent(inputEvent);
        };
        this.oninput = this.oninput;
    }
}
