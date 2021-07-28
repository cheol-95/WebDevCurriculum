export default class Tools {
    constructor(explorer) {
        this.toolBox = explorer.querySelector('#tools');
        this.init(this.toolBox);
    }
    init(toolBox) {
        this.setClickEvent(toolBox);
    }
    setClickEvent(toolBox) {
        const onClick = (e) => {
            const newFileCustomEvent = new CustomEvent('clickTools', {
                bubbles: true,
            });
            e.target.dispatchEvent(newFileCustomEvent);
        };
        toolBox.addEventListener('click', onClick);
    }
}
