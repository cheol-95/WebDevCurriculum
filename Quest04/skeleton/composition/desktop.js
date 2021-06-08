// 다른 class에서 this를 사용하기 위해 Element 생성
class MakeElement {
  constructor(element) {
    const newElement = document.createElement(element);
    return newElement;
  }
}

// 드래그 이벤트를 내포한 클래스
class DragElement {
  constructor() {
    this.onmousedown = this.#dragAndDrop;
    this.ondragstart = () => false;
  }

  #dragAndDrop = (e) => {
    e.target.style.zIndex = 1000;

    const move = (pageX, pageY) => {
      e.target.style.left = pageX - e.offsetX + 'px';
      e.target.style.top = pageY - e.offsetY + 'px';
    };

    const onMouseMove = (e) => {
      move(e.pageX, e.pageY);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      e.target.onmouseup = null;
    };

    document.addEventListener('mousemove', onMouseMove);
    e.target.addEventListener('mouseup', onMouseUp);
  };
}

// 아이콘
class Icon extends MakeElement {
  #id;
  #src;
  constructor(id, imageSrc) {
    super('img');
    this.#id = id;
    this.#src = imageSrc;
    this.className = 'icon';
    this.style.top += size.icon.top + this.#id * size.icon.height + 'px';

    this.setAttribute('id', 'icon_' + this.#id);
    this.setAttribute('src', this.#src);

    this.#composition();
  }

  #composition = () => {
    Object.assign(this, new DragElement());
  };
}

// 폴더 창 끄기버튼
class XBox extends MakeElement {
  #id;
  #src = dummy.src.xbox;
  constructor(id) {
    super('img');
    this.#id = id;
    this.className = 'xbox';
    this.src = this.#src;

    this.#addEvent();
    this.#composition();
  }

  #addEvent = () => {
    this.addEventListener('click', this.#closeWindow);
  };

  #closeWindow = () => {
    const forder = document.getElementById('forder_' + this.#id);
    const window = document.getElementById('window_' + this.#id);
    forder.hasWindow = false;
    window.remove();
  };

  #composition = () => {
    Object.assign(this, new DragElement());
  };
}

// 폴더 창
class Window extends MakeElement {
  #id;
  #desktopId;
  constructor(desktopId, id) {
    super('div');
    this.#id = id;
    this.#desktopId = desktopId;
    this.className = 'window';

    this.setAttribute('id', 'window_' + this.#id);

    this.#appendElements();
    this.#composition();
  }

  #appendElements = () => {
    this.#createXbox();
    this.#createTextbox();
  };

  #createXbox = () => {
    const xBox = new XBox(this.#id);
    this.append(xBox);
  };

  #createTextbox = () => {
    const textbox = new MakeElement('div');
    textbox.className = 'textbox';
    textbox.innerHTML = `Tab: ${this.#desktopId}<br>Forder: ${this.#id}`;
    this.append(textbox);
  };

  #composition = () => {
    Object.assign(this, new DragElement());
  };
}

// 폴더
class Folder extends MakeElement {
  #id;
  #src;
  #desktopId;
  hasWindow;
  constructor(desktopId, id, src) {
    super('img');
    this.#id = id;
    this.#src = src;
    this.#desktopId = desktopId;
    this.className = 'forder';
    this.style.top += size.icon.top + this.#id * size.icon.height + 'px';

    this.setAttribute('id', 'forder_' + this.#id);
    this.setAttribute('src', this.#src);

    this.#addEvent();
    this.#composition();
  }

  #composition = () => {
    Object.assign(this, new DragElement());
  };

  #addEvent = () => {
    this.addEventListener('dblclick', this.#openWindow);
  };

  #openWindow = () => {
    if (!this.hasWindow) {
      const newWindow = new Window(this.#desktopId, this.#id);
      this.parentElement.append(newWindow);
      this.hasWindow = true;
    }
  };

  static deleteWindow = (id) => {
    const targetWindow = document.getElementById('window_' + id);
    targetWindow.remove();

    const targetForder = document.getElementById('forder_' + id);
    targetForder.hasWindow = false;
  };
}

// 상단 탭
class Tab extends MakeElement {
  #id;
  constructor(id) {
    super('li');
    this.#id = id;
    this.className = 'tab';
    this.innerHTML = this.#id;

    this.setAttribute('id', 'tab_' + this.#id);

    this.#addEvent();
  }

  #addEvent = () => {
    this.addEventListener('click', this.#viewingDesktop);
  };

  #viewingDesktop = () => {
    if (this.#id !== dummy.currentTab) {
      document.getElementById('desktop_' + this.#id).selected(true);
      document.getElementById('desktop_' + dummy.currentTab).selected(false);
      dummy.currentTab = this.#id;
    }
  };
}

// 바탕화면
class Desktop extends MakeElement {
  #id;
  #iconCount;
  #forderCount;
  constructor(id, forderCount, iconCount, selected) {
    super('div');
    this.#id = id;
    this.#iconCount = iconCount;
    this.#forderCount = forderCount;

    this.setAttribute('id', 'desktop_' + this.#id);

    this.#appendElements();
    this.selected(selected);
  }

  #appendElements = () => {
    this.#createForder();
    this.#createIcon();
    this.#createTab();
  };

  #createForder = () => {
    for (let elementId = 0; elementId < this.#forderCount; elementId++) {
      const newForder = new Folder(this.#id, elementId, dummy.src.forder);
      this.append(newForder);
    }
  };

  #createIcon = () => {
    for (let elementId = 0; elementId < this.#iconCount; elementId++) {
      const newIcon = new Icon(elementId, dummy.src.icon);
      this.append(newIcon);
    }
  };

  #createTab = () => {
    const newTab = new Tab(this.#id);
    const tabBar = document.querySelector('.tabbar');
    tabBar.append(newTab);
  };

  selected = (state) => {
    this.hidden = !state;
    document.getElementById('tab_' + this.#id).style.background = state ? 'skyblue' : null;
  };
}
