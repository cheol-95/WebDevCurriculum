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

  filePrefix(fileName) {
    return 'edt_f_' + fileName;
  }

  async getFileList() {
    try {
      const res = await this.customFetch(dummy.fileUrl);
      await this.#checkStatus(res);

      const { fileList } = await res.json();
      return fileList;
    } catch (err) {
      this.#errHandler(err, '파일 목록 로드 에러');
    }
  }

  async #errHandler(err, defaultMsg) {
    err.msg ? alert(err.msg) : alert(defaultMsg);
    if (err.code === 401) {
      location.href = '/';
    }
  }

  async createFile(newFileName) {
    try {
      if (!this.#validation(newFileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const res = await this.customFetch(dummy.fileUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ newFileName }),
      });

      await this.#checkStatus(res);
      localStorage.setItem(this.filePrefix(newFileName), '');
    } catch (err) {
      this.#errHandler(err, '파일 생성 에러');
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

      const res = await this.customFetch(dummy.fileUrl + fileName, {
        credentials: 'include',
      });

      await this.#checkStatus(res);
      const { data } = await res.json();

      localStorage.setItem(this.filePrefix(fileName), data);
      return data;
    } catch (err) {
      this.#errHandler(err, '파일 로드 에러');
    }
  }

  async saveFile(fileName, text) {
    try {
      if (!this.#validation(fileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const res = await this.customFetch(dummy.fileUrl + fileName, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          data: text,
        }),
      });

      if (res.status !== 200) {
        throw { msg: await res.json() };
      }
      await this.#checkStatus(res);

      localStorage.setItem(this.filePrefix(fileName), text);
      alert('파일 저장 완료');
    } catch (err) {
      this.#errHandler(err, '파일 저장 실패');
    }
  }

  async saveAsFile(oldFileName, newFileName, text) {
    try {
      if (!this.#validation(oldFileName) && !this.#validation(newFileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const res = await this.customFetch(dummy.fileUrl + oldFileName, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          newFileName,
          data: text,
        }),
      });

      if (res.status !== 200) {
        throw { msg: await res.json() };
      }
      await this.#checkStatus(res);

      localStorage.setItem(this.filePrefix(newFileName), text);
      localStorage.removeItem(this.filePrefix(oldFileName));

      alert('다른 이름으로 저장 완료');
    } catch (err) {
      this.#errHandler(err, '다른 이름으로 저장 완료');
    }
  }

  async removeFile(fileName) {
    try {
      if (!this.#validation(fileName)) {
        throw { msg: '잘못된 파일명입니다' };
      }

      const res = await this.customFetch(dummy.fileUrl + fileName, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.status !== 200) {
        throw { msg: await res.json() };
      }
      await this.#checkStatus(res);

      localStorage.removeItem(this.filePrefix(fileName));
      alert('파일 삭제 완료');
    } catch (err) {
      this.#errHandler(err, '파일 삭제 실패');
    }
  }

  #validation(fileName) {
    return ['/', '.'].some((x) => fileName.includes(x)) ? false : true;
  }

  async #checkStatus(res) {
    if (res.status === 401) {
      throw { code: 401, msg: '권한이 없습니다. \n다시 로그인 해주세요.' };
    }

    if (res.status >= 399) {
      throw { msg: await res.json() };
    }
  }

  async logout() {
    try {
      await this.customFetch(dummy.authUrl + 'logout', {
        method: 'POST',
      });
    } catch (err) {
      alert(err.message);
    }
  }

  async customFetch(path, options = {}) {
    options = {
      ...options,
      credentials: 'include',
    };

    return await fetch(path, options);
  }
}
