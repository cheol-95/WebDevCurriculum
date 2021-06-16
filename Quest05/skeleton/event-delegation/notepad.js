const dummy = {
  fileIdPrefix: 'edit_',
  src: {
    xbox: 'https://image.flaticon.com/icons/png/512/0/39.png',
    exclamation: 'https://image.flaticon.com/icons/png/512/3521/3521964.png',
  },
  menu: {
    save: '저장',
    saveAs: '다른 이름으로 저장',
    delete: '삭제',
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
  #menu;
  #tabBar;
  #editBox;
  #explorers;
  constructor() {
    this.#editBox = new EditBox();
    this.#tabBar = new TabBar();
    this.#explorers = new Explorers();
    this.#menu = new ContextMenu();
  }
}
