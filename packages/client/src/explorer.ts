import Tools from './tools.js';

export default class Explorer extends HTMLElement {
  append: any;

  templateFile: any;

  private explorer;

  constructor(explorer: any, fileList: Array<string>) {
    super();
    this.explorer = explorer;
    this.init(this.explorer, fileList);
    this.composition(this.explorer);
    return this.explorer;
  }

  private init(explorer: any, fileList: Array<string>) {
    new Tools(explorer);
    this.setTemplate(explorer);
    this.setFiles(fileList);
    explorer.addFile = this.addFile;
    explorer.removeFile = this.removeFile;
    explorer.getFileElement = this.getFileElement;
    explorer.updateFileName = this.updateFileName;
  }

  private composition(explorer: any) {
    Object.assign(explorer, new ExplorerEvent());
  }

  private setTemplate(explorer: any) {
    explorer.templateFile = document.createElement('template');
    explorer.templateFile.innerHTML = `
      <li class="list">
        <a class="anchor" href="#"> </a>
      </li>
    `;
  }

  private async setFiles(fileList: Array<string>) {
    fileList.forEach((fileName) => {
      if (fileName) {
        this.setFile(fileName);
      }
    });
  }

  private setFile(fileName: string) {
    const clone = this.getFileElement(fileName);
    this.explorer.append(clone);
  }

  addFile(fileName: string) {
    const clone = this.getFileElement(fileName);
    this.append(clone);
  }

  getFileElement(fileName: string): any {
    const template = this.templateFile ? this.templateFile : this.explorer.templateFile;
    const clone = template.content.cloneNode(true);

    const li = clone.querySelector('li');
    li.id = `file_${fileName}`;

    const a = clone.querySelector('a');
    a.fileName = fileName;
    a.textContent = fileName;
    return clone;
  }

  updateFileName(oldFileName: string, newFileName: string) {
    const oldFile: any = this.querySelector(`#file_${oldFileName}`);
    this.replaceChild(this.getFileElement(newFileName), oldFile);
    oldFile.remove();
  }

  removeFile(fileName: string) {
    const removeTarget: any = this.querySelector(`#file_${fileName}`);
    removeTarget.remove();
  }
}

class ExplorerEvent {
  onclick: any;

  oncontextmenu: any;

  constructor() {
    this.onclick = this.click;
    this.oncontextmenu = this.callMenu;
  }

  private click = (e: MouseEvent | any) => {
    if (e.target.className === 'anchor') {
      const clickCustomEvent = new CustomEvent('clickFile', {
        bubbles: true,
      });

      e.target.dispatchEvent(clickCustomEvent);
    }
  };

  private callMenu = (e: MouseEvent | any) => {
    e.preventDefault();

    if (e.target.className === 'anchor') {
      const callMenuCustomEvent = new CustomEvent('callMenu', {
        bubbles: true,
        detail: {
          pageX: e.pageX,
          pageY: e.pageY,
          fileName: e.target.fileName,
        },
      });

      e.target.dispatchEvent(callMenuCustomEvent);
    }
  };
}
