class Tools {
  #toolBox = document.getElementById('tools');
  constructor() {
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
