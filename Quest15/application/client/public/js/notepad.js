import TabBar from './tabbar.js';
import ContextMenu from './menu.js';
import EditBox from './editbox.js';
import Explorer from './explorer.js';
import NotepadStorage from './storage.js';
export default class Notepad {
    constructor() {
        this.closeEvent = () => {
            if (this.tabBar && this.tabBar.currentFile !== '') {
                localStorage.setItem('edt_cur_tab', this.tabBar.currentFile);
            }
            Object.keys(localStorage).forEach((fileName) => {
                if (/^edt_f_/.test(fileName)) {
                    localStorage.removeItem(fileName);
                }
            });
        };
        this.clickTools = async (e) => {
            if (e.target.id === 'newFile') {
                const newFileName = prompt('파일 이름을 입력하세요');
                if (!this.fileNameValidation(newFileName)) {
                    return;
                }
                try {
                    await this.storage.createFile(newFileName);
                    this.explorer.addFile(newFileName);
                    this.fileList.push(newFileName);
                }
                catch (err) { }
            }
            else if (e.target.id === 'logout') {
                if (confirm('정말 로그아웃 하시겠습니까?')) {
                    this.logout();
                }
            }
        };
        this.saveFile = async (e) => {
            const { fileName } = e.detail;
            const text = this.editBox.getText();
            await this.storage.saveFile(fileName, text);
            this.tabBar.setIndicator(fileName, 'xbox');
        };
        this.saveAsFile = async (e) => {
            const newFileName = prompt('저장할 파일 이름을 입력하세요');
            const validation = this.fileNameValidation(newFileName);
            if (!validation) {
                return;
            }
            const { fileName: oldFileName } = e.detail;
            const text = this.editBox.getText();
            try {
                await this.storage.saveAsFile(oldFileName, newFileName, text);
            }
            catch (err) {
                throw err;
            }
            this.tabBar.updateTab(oldFileName, newFileName);
            this.explorer.updateFileName(oldFileName, newFileName);
        };
        this.deleteFile = (e) => {
            const { fileName } = e.detail;
            if (confirm(`${fileName}을 삭제하시겠습니까?`)) {
                this.tabBar.removeTab(fileName);
                this.explorer.removeFile(fileName);
                this.storage.removeFile(fileName);
            }
        };
        this.callMenu = (e) => {
            this.tabBar.addTab(e.detail.fileName);
            this.menu.callMenu(e.detail);
        };
        this.clickFile = (e) => {
            const { fileName } = e.target;
            this.tabBar.addTab(fileName);
        };
        this.clickTab = (e) => {
            const targetTab = e.target.closest('.tab');
            if (!targetTab) {
                return;
            }
            if (e.target.className === 'anchor') {
                this.tabBar.setFocus(targetTab.fileName);
                return;
            }
            if (e.target.className === 'indicator') {
                this.tabBar.removeTab(targetTab.fileName);
                const tabs = JSON.parse(localStorage.getItem('edt_tabs')).filter((tab) => tab !== targetTab.fileName);
                localStorage.setItem('edt_tabs', JSON.stringify(tabs));
                localStorage.removeItem(`edt_f_${targetTab.fileName}`);
            }
        };
        this.setIndicator = (e) => {
            const { fileName } = e.detail;
            this.tabBar.setIndicator(fileName, 'exclamation');
        };
        this.fileNameValidation = (fileName) => {
            if (this.fileList.includes(fileName)) {
                alert('이미 존재하는 파일명입니다');
                return false;
            }
            if (fileName === '') {
                alert('공백은 허용되지 않습니다.');
                return false;
            }
            if (!fileName) {
                return false;
            }
            return true;
        };
        this.storage = new NotepadStorage();
        this.init();
        this.addEvent();
        return this.notepad;
    }
    async init() {
        this.setDOM();
        this.fileList = await this.storage.getFileList();
        this.menu = new ContextMenu(this.notepad.querySelector('#contextMenu'));
        this.editBox = new EditBox(this.notepad.querySelector('#editBox'), this.storage);
        this.tabBar = new TabBar(this.notepad.querySelector('#tabBar'));
        this.explorer = new Explorer(this.notepad.querySelector('#explorer'), this.fileList);
    }
    setDOM() {
        this.notepad = document.createElement('div');
        this.notepad.id = 'notepad';
        this.notepad.innerHTML = `
      <ul id="explorer">
        <li id="tools">
          <button id="newFile" class="button">새 파일</button>
          <button id="logout" class="button">로그아웃</button>
        </li>
      </ul>
    
      <section id="tabBar"></section>
      <section id="editBox"></section>
      <div id="contextMenu"></div>
    `;
    }
    addEvent() {
        this.notepad.className = 'layout';
        this.notepad.addEventListener('clickTools', this.clickTools);
        this.notepad.addEventListener('saveFile', this.saveFile);
        this.notepad.addEventListener('saveAsFile', this.saveAsFile);
        this.notepad.addEventListener('deleteFile', this.deleteFile);
        this.notepad.addEventListener('callMenu', this.callMenu);
        this.notepad.addEventListener('clickFile', this.clickFile);
        this.notepad.addEventListener('clickTab', this.clickTab);
        this.notepad.addEventListener('setIndicator', this.setIndicator);
        this.notepad.addEventListener('logout', this.logout);
        window.addEventListener('beforeunload', this.closeEvent);
    }
    async logout() {
        await this.storage.logout();
    }
}
