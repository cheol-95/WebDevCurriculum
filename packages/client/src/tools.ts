export default class Tools {
  private toolBox: HTMLElement | any;

  constructor(explorer: HTMLElement) {
    this.toolBox = explorer.querySelector('#tools');
    this.init(this.toolBox);
  }

  private init(toolBox: HTMLElement) {
    this.setClickEvent(toolBox);
  }

  private setClickEvent(toolBox: HTMLElement) {
    const onClick = (e: MouseEvent | any) => {
      const newFileCustomEvent = new CustomEvent('clickTools', {
        bubbles: true,
      });
      e.target.dispatchEvent(newFileCustomEvent);
    };

    toolBox.addEventListener('click', onClick);
  }
}
