const dummy = {
  fileUrl: 'http://localhost:8000/file/',
  authUrl: 'http://localhost:8000/auth/',
};

export default class NotepadStorage {
  constructor() {
    this.#init();
  }

  #init() {
    if (!localStorage.getItem('edt_tabs')) {
      localStorage.setItem('edt_tabs', JSON.stringify([]));
    }

    if (!localStorage.getItem('edt_cur_tab')) {
      localStorage.setItem('edt_cur_tab', '');
    }
  }

  async #errorHandler(res, defaultMsg) {
    if (res.status === 401) {
      alert('세션이 만료되었습니다\n다시 로그인 해주세요');
      this.logout();
    } else {
      const err = await res.json();
      err.msg ? alert(err.msg) : alert(defaultMsg);
    }
  }

  #validation(fileName) {
    return ['/', '.'].some((x) => fileName.includes(x)) ? false : true;
  }

  async getFileList() {
    try {
      const res = await this.customFetch(dummy.fileUrl);
      if (res.status > 399) {
        throw res;
      }

      const { fileList } = await res.json();
      return fileList;
    } catch (res) {
      throw this.#errorHandler(res, '파일목록을 로드하는데 실패했습니다');
    }
  }

  async createFile(newFileName) {
    try {
      if (!this.#validation(newFileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const res = await this.customFetch(dummy.fileUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: { newFileName },
      });

      if (res.status > 399) {
        throw res;
      }

      localStorage.setItem(this.filePrefix(newFileName), '');
    } catch (res) {
      throw this.#errorHandler(res, '파일 생성에 실패했습니다');
    }
  }

  async getFile(fileName) {
    try {
      if (!this.#validation(fileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      if (localStorage.getItem(this.filePrefix(fileName))) {
        return localStorage.getItem(this.filePrefix(fileName));
      }

      const res = await this.customFetch(dummy.fileUrl + fileName, {});
      if (res.status > 399) {
        throw res;
      }

      const { data } = await res.json();
      localStorage.setItem(this.filePrefix(fileName), data);
      return data;
    } catch (res) {
      throw this.#errorHandler(res, '파일을 로드하는데 실패했습니다');
    }
  }

  async saveFile(fileName, text) {
    try {
      if (!this.#validation(fileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const res = await this.customFetch(dummy.fileUrl + fileName, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: { data: text },
      });

      if (res.status > 399) {
        throw res;
      }

      localStorage.setItem(this.filePrefix(fileName), text);
      alert('파일 저장 완료');
    } catch (res) {
      throw this.#errorHandler(res, '파일 저장에 실패했습니다');
    }
  }

  async saveAsFile(oldFileName, newFileName, text) {
    try {
      if (!this.#validation(oldFileName) && !this.#validation(newFileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const res = await this.customFetch(dummy.fileUrl + oldFileName, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: {
          newFileName,
          data: text,
        },
      });

      if (res.status > 399) {
        throw res;
      }

      localStorage.setItem(this.filePrefix(newFileName), text);
      localStorage.removeItem(this.filePrefix(oldFileName));

      const tabs = JSON.parse(localStorage.getItem('edt_tabs')).filter(
        (tab) => tab !== oldFileName
      );
      tabs.push(newFileName);
      localStorage.setItem('edt_tabs', JSON.stringify(tabs));

      alert('다른 이름으로 저장 완료');
    } catch (res) {
      throw this.#errorHandler(res, '다른 이름으로 저장에 실패했습니다');
    }
  }

  async removeFile(fileName) {
    try {
      if (!this.#validation(fileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const res = await this.customFetch(dummy.fileUrl + fileName, {
        method: 'DELETE',
      });

      if (res.status > 399) {
        throw res;
      }

      const tabs = JSON.parse(localStorage.getItem('edt_tabs')).filter((tab) => tab !== fileName);
      localStorage.setItem('edt_tabs', JSON.stringify(tabs));
      localStorage.removeItem(this.filePrefix(fileName));
      alert('파일 삭제 완료');
    } catch (res) {
      throw this.#errorHandler(res, '파일 삭제에 실패했습니다');
    }
  }

  async logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('edt_tabs');
    localStorage.removeItem('edt_cur_tab');
    window.stop();
    location.href = '/';
  }

  async customFetch(path, options = {}) {
    return await fetch(path, {
      ...options,
      credential: 'includes',
      headers: {
        ...options.headers,
        Authorization: 'bearer ' + localStorage.jwt,
      },
      ...(options.body && { body: JSON.stringify(options.body) }),
    });
  }

  filePrefix(fileName) {
    return 'edt_f_' + fileName;
  }
}
