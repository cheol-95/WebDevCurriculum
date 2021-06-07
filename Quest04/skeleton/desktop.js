class MakeElement {
  constructor(element) {
    const newElement = document.createElement(element);
    return newElement;
  }
}

const dragAndDrop = (e) => {
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

class DragElement extends MakeElement {
  constructor(element) {
    super(element);
    this.onmousedown = dragAndDrop;
    this.ondragstart = () => {
      return false;
    };
  }
}

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

class Window extends DragElement {
  #id;
  constructor(desktopId, id) {
    super('div');
    this.#id = id;

    this.className = 'window';
    this.innerHTML = `Tab: ${desktopId}<br>Forder: ${this.#id}`;

    this.setAttribute('id', 'window_' + this.#id);
  }
}

class OpenElement extends MakeElement {
  constructor(element) {
    super(element);
  }
}

class Folder extends MakeElement {
  #id;
  #src;
  #hasWindow = false;
  constructor(desktopId, id, src) {
    super('img');
    this.#id = id;
    this.#src = src;

    this.className = 'forder';
    this.style.top += size.icon.top + this.#id * size.icon.height + 'px';

    this.setAttribute('id', 'forder_' + this.#id);
    this.setAttribute('src', this.#src);

    this.ondblclick = () => {
      if (!this.#hasWindow) {
        const newWindow = new Window(desktopId, this.#id);
        this.parentElement.append(newWindow);
        this.#hasWindow = true;
      }
    };
  }
}

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

    this.#MakeElement();
    this.selected(selected);
  }

  #MakeElement = () => {
    this.#makeForder();
    this.#makeIcon();
    this.#makeTab();
  };

  #makeForder = () => {
    for (let elementId = 0; elementId < this.#forderCount; elementId++) {
      const newForder = new Folder(this.#id, elementId, dummy.src.forder);
      this.append(newForder);
    }
  };

  #makeIcon = () => {
    for (let elementId = 0; elementId < this.#iconCount; elementId++) {
      const newIcon = new Icon(elementId, dummy.src.icon);
      this.append(newIcon);
    }
  };

  #makeTab = () => {
    const newTab = new Tab(this.#id);
    const tabBar = document.querySelector('.tabbar');
    tabBar.append(newTab);
  };

  selected = (state) => {
    this.hidden = !state;
    document.getElementById('tab_' + this.#id).style.background = state ? 'skyblue' : null;
  };
}
