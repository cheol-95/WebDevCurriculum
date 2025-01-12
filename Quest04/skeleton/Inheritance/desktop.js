// 다른 class에서 this를 사용하기 위해 Element 생성
class MakeElement {
  constructor(element) {
    const newElement = document.createElement(element);
    return newElement;
  }
}

// 드래그 이벤트
const dragAndDrop = (e) => {
  e.target.style.zIndex = 1000;
  const move = (pageX, pageY) => {
    e.target.style.left = pageX - e.offsetX + 'px';
    e.target.style.top = pageY - e.offsetY + 'px';
  };

  const onMouseMove = (e) => {
    move(e.pageX, e.pageY);
  };

  move(e.pageX, e.pageY);
  document.addEventListener('mousemove', onMouseMove);
  e.target.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    e.target.onmouseup = null;
  };
};

// 드래그가 가능한 element
class DragElement extends MakeElement {
  constructor(element) {
    super(element);
    this.onmousedown = dragAndDrop;
    this.ondragstart = () => {
      return false;
    };
  }
}

// 아이콘
class Icon extends DragElement {
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
  }
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

    this.onclick = (e) => {
      Folder.deleteWindow(this.#id);
    };
  }
}

// 폴더 창
class Window extends DragElement {
  #id;
  #desktopId;
  constructor(desktopId, id) {
    super('div');
    this.#id = id;
    this.#desktopId = desktopId;
    this.className = 'window';

    this.setAttribute('id', 'window_' + this.#id);

    this.#appendElements();
  }

  #appendElements = () => {
    this.#createXbox();
    this.#createTextbox();
  };

  #createXbox = () => {
    this.append(new XBox(this.#id));
  };

  #createTextbox = () => {
    const textbox = new MakeElement('div');
    textbox.className = 'textbox';
    textbox.innerHTML = `Tab: ${this.#desktopId}<br>Folder: ${this.#id}`;
    this.append(textbox);
  };
}

// 폴더
class Folder extends DragElement {
  #id;
  #src;
  #hasWindow;
  constructor(desktopId, id, src) {
    super('img');
    this.#id = id;
    this.#src = src;

    this.className = 'folder';
    this.style.top += size.icon.top + this.#id * size.icon.height + 'px';

    this.setAttribute('id', 'folder_' + this.#id);
    this.setAttribute('src', this.#src);

    this.ondblclick = () => {
      if (!this.#hasWindow) {
        const newWindow = new Window(desktopId, this.#id);
        this.parentElement.append(newWindow);
        this.#hasWindow = true;
      }
    };
  }

  static deleteWindow(id) {
    const targetWindow = document.getElementById('window_' + id);
    targetWindow.remove();

    const targetFolder = document.getElementById('folder_' + id);
    targetFolder.#hasWindow = false;
  }
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

    this.onclick = (e) => {
      if (this.#id !== dummy.currentTab) {
        document.getElementById('desktop_' + this.#id).selected(true);
        document.getElementById('desktop_' + dummy.currentTab).selected(false);
        dummy.currentTab = this.#id;
      }
    };
  }
}

// 바탕화면
class Desktop extends MakeElement {
  #id;
  #iconCount;
  #folderCount;
  constructor(id, folderCount, iconCount, selected) {
    super('div');
    this.#id = id;
    this.#iconCount = iconCount;
    this.#folderCount = folderCount;

    this.setAttribute('id', 'desktop_' + this.#id);

    this.#appendElements();
    this.selected(selected);
  }

  #appendElements = () => {
    this.#createFolder();
    this.#createIcon();
    this.#createTab();
  };

  #createFolder = () => {
    for (let elementId = 0; elementId < this.#folderCount; elementId++) {
      const newFolder = new Folder(this.#id, elementId, dummy.src.folder);
      this.append(newFolder);
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
