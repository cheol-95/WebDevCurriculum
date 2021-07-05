export default class Tools {
  #toolBox;
  constructor(explorer) {
    this.#toolBox = explorer.querySelector('#tools');
    this.#init(this.#toolBox);
  }

  #init(toolBox) {
    this.#setCreateButton(toolBox);
  }

  #setCreateButton(toolBox) {
    const click = (e) => {
      const newFileCustomEvent = new CustomEvent('newFile', {
        bubbles: true,
      });

      e.target.dispatchEvent(newFileCustomEvent);
    };

    toolBox.querySelector('#newFile').onclick = click;
  }
}
