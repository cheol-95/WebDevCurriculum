import { customFetch } from './utils/fetch.js';

interface File {
  name: string;
  text: string;
}

interface Extension {
  code: string;
}

interface Err {
  extensions: Extension;
  message: string;
}

export default class NotepadStorage {
  constructor() {
    if (!localStorage.getItem('edt_tabs')) {
      localStorage.setItem('edt_tabs', JSON.stringify([]));
    }

    if (!localStorage.getItem('edt_cur_tab')) {
      localStorage.setItem('edt_cur_tab', '');
    }
  }

  validation(fileName: string): boolean {
    return !['/', '.'].some((x) => fileName.includes(x));
  }

  filePrefix(fileName: string): string {
    return `edt_f_${fileName}`;
  }

  async getFileList(): Promise<any> {
    try {
      const query = {
        query: `
        query {
          files {
            name
          }
        }
      `,
      };

      const body = await customFetch('POST', query);
      if (body.errors) {
        throw body.errors;
      }

      return body.data.files.map((file: File) => file.name);
    } catch (errors) {
      this.errorHandler(errors[0], '파일목록을 로드하는데 실패했습니다');
    }
  }

  async createFile(newFileName: string): Promise<void> {
    try {
      if (!this.validation(newFileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const query = {
        query: `
        mutation {
          createFile(fileName: "${newFileName}")
        }
        `,
      };

      const body = await customFetch('POST', query);
      if (body.errors) {
        throw body.errors;
      }

      localStorage.setItem(this.filePrefix(newFileName), '');
    } catch (errors) {
      this.errorHandler(errors[0], '파일 생성에 실패했습니다');
    }
  }

  async getFile(fileName: string): Promise<any> {
    try {
      if (!this.validation(fileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      if (localStorage.getItem(this.filePrefix(fileName))) {
        return localStorage.getItem(this.filePrefix(fileName));
      }

      const query = {
        query: `
          query {
            file(fileName: "${fileName}"){
              name,
              text
            }
          }`,
      };

      const body = await customFetch('POST', query);
      if (body.errors) {
        throw body.errors;
      }

      const { name, text } = body.data.file;
      localStorage.setItem(this.filePrefix(name), text);
      return text;
    } catch (errors) {
      this.errorHandler(errors[0], '파일을 로드에 실패했습니다');
    }
  }

  async saveFile(fileName: string, text: string): Promise<void> {
    try {
      if (!this.validation(fileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const query = {
        query: `
          mutation {
            saveFile(fileName: "${fileName}", text: "${text}")
          }`,
      };

      const body = await customFetch('POST', query);
      if (body.errors) {
        throw body.errors;
      }

      localStorage.setItem(this.filePrefix(fileName), text);
      alert('파일 저장 완료');
    } catch (errors) {
      this.errorHandler(errors[0], '파일 저장에 실패했습니다');
    }
  }

  async saveAsFile(oldFileName: string, newFileName: string, text: string): Promise<void> {
    try {
      if (!this.validation(oldFileName) && !this.validation(newFileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const query = {
        query: `
          mutation {
            saveAsFile(oldFileName: "${oldFileName}", newFileName: "${newFileName}", text: "${text}")
          }`,
      };

      const body = await customFetch('POST', query);
      if (body.errors) {
        throw body.errors;
      }

      localStorage.setItem(this.filePrefix(newFileName), text);
      localStorage.removeItem(this.filePrefix(oldFileName));

      const tabs = JSON.parse(localStorage.getItem('edt_tabs')).filter(
        (tab: string) => tab !== oldFileName,
      );
      tabs.push(newFileName);
      localStorage.setItem('edt_tabs', JSON.stringify(tabs));

      alert('다른 이름으로 저장 완료');
    } catch (errors) {
      this.errorHandler(errors[0], '다른 이름으로 저장에 실패했습니다');
    }
  }

  async removeFile(fileName: string): Promise<void> {
    try {
      if (!this.validation(fileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }
      const query = {
        query: `
          mutation {
            deleteFile(fileName: "${fileName}")
          }`,
      };

      const body = await customFetch('POST', query);
      if (body.errors) {
        throw body.errors;
      }

      const tabs = JSON.parse(localStorage.getItem('edt_tabs')).filter(
        (tab: string) => tab !== fileName,
      );
      localStorage.setItem('edt_tabs', JSON.stringify(tabs));
      localStorage.removeItem(this.filePrefix(fileName));

      alert('파일 삭제 완료');
    } catch (errors) {
      this.errorHandler(errors[0], '파일 삭제에 실패했습니다');
    }
  }

  async logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('edt_tabs');
    localStorage.removeItem('edt_cur_tab');
    window.stop();
    location.href = '/';
  }

  private async errorHandler(err: Err, defaultMsg: string) {
    if (err.extensions.code === 'UNAUTHENTICATED') {
      alert('세션이 만료되었습니다\n다시 로그인 해주세요');
      this.logout();
    } else if (err.extensions) {
      alert(err.message);
    } else {
      alert(defaultMsg);
    }
  }
}
