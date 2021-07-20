import Tools from './tools.js';
export default class Explorer {
    constructor(explorer, fileList) {
        this.explorer = explorer;
        this.init(this.explorer, fileList);
        this.composition(this.explorer);
        return this.explorer;
    }
    init(explorer, fileList) {
        new Tools(explorer);
        this.setTemplate(explorer);
        this.setFiles(fileList);
        explorer.addFile = this.addFile;
        explorer.removeFile = this.removeFile;
        explorer.getFileElement = this.getFileElement;
        explorer.updateFileName = this.updateFileName;
    }
    composition(explorer) {
        Object.assign(explorer, new ExplorerEvent());
    }
    setTemplate(explorer) {
        explorer.templateFile = document.createElement('template');
        explorer.templateFile.innerHTML = `
      <li class="list">
        <a class="anchor" href="#"> </a>
      </li>
    `;
    }
    async setFiles(fileList) {
        fileList.forEach((fileName) => {
            if (fileName) {
                this.setFile(fileName);
            }
        });
    }
    setFile(fileName) {
        const clone = this.getFileElement(fileName);
        this.explorer.append(clone);
    }
    addFile(fileName) {
        const clone = this.getFileElement(fileName);
        this.append(clone);
    }
    getFileElement(fileName) {
        const template = this.templateFile ? this.templateFile : this.explorer.templateFile;
        const clone = template.content.cloneNode(true);
        const li = clone.querySelector('li');
        li.id = `file_${fileName}`;
        const a = clone.querySelector('a');
        a.fileName = fileName;
        a.textContent = fileName;
        return clone;
    }
    updateFileName(oldFileName, newFileName) {
        const oldFile = this.querySelector(`#file_${oldFileName}`);
        this.replaceChild(this.getFileElement(newFileName), oldFile);
        oldFile.remove();
    }
    removeFile(fileName) {
        this.querySelector(`#file_${fileName}`).remove();
    }
}
class ExplorerEvent {
    constructor() {
        this.click = (e) => {
            if (e.target.className === 'anchor') {
                const clickCustomEvent = new CustomEvent('clickFile', {
                    bubbles: true,
                });
                e.target.dispatchEvent(clickCustomEvent);
            }
        };
        this.callMenu = (e) => {
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
        this.onclick = this.click;
        this.oncontextmenu = this.callMenu;
    }
}
