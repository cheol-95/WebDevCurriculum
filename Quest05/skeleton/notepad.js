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
  constructor() {}
}

class Tab {
  #id;
  constructor(id) {}
}

class File {
  #id;
  #name;
  #text;
  #currentPoint; // 스택의 가장 최고 점 참조
  constructor(id, name) {}
}
