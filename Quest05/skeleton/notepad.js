const dummy = {
  fileIdPrefix: 'edit_',
  src: {
    xbox: 'https://image.flaticon.com/icons/png/512/1828/1828843.png',
  },
};

// 뷰 리사이징 이벤트
const init = () => {
  (() => {
    const setViewSize = () => {
      const layout = document.getElementsByClassName('layout')[0];
      layout.style.height = window.innerHeight + 'px';
      layout.style.width = window.innerWidth + 'px';
    };

    setViewSize();
    window.addEventListener('resize', setViewSize);
  })();
};

class Notepad {
  #tabBar;
  #editBox;
  #explorers;
  constructor() {
    this.#editBox = new EditBox();
    this.#tabBar = new TabBar();
    this.#explorers = new Explorers();
  }
}
