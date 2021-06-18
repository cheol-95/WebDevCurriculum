class Tools {
  #toolBox = document.createElement('li');
  constructor() {
    this.#toolBox.className = 'tools';

    this.#setTools(this.#toolBox);
    return this.#toolBox;
  }

  #setTools(toolBox) {
    this.#setCreateButton(toolBox);
  }

  #getButton() {
    const newButton = document.createElement('button');
    newButton.className = 'button';
    return newButton;
  }

  #setCreateButton(toolBox) {
    const click = (e) => {
      e.target.closest('#explorer').addFile();
    };

    const createButton = this.#getButton();
    createButton.innerHTML = '새 파일';
    createButton.onclick = click;
    toolBox.append(createButton);
  }
}
