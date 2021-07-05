const dummy = {
  fileUrl: 'http://localhost:8000/file/',
};

export default class NotepadStorage {
  fileData = null;
  constructor() {}

  async getFileList() {
    try {
      const res = await fetch(dummy.fileUrl);
      const { fileList } = await res.json();

      this.fileData = fileList.reduce((acc, cur) => ({ ...acc, [cur]: null }), {});
      return fileList;
    } catch (err) {
      alert('파일 목록 로드 에러');
    }
  }

  async createFile(newFileName) {
    try {
      const res = await fetch(dummy.fileUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ newFileName }),
      });

      if (res.status !== 201) {
        throw { msg: await res.json() };
      }

      this.fileData[newFileName] = '';
    } catch (err) {
      err.msg ? alert(err.msg) : alert('파일 생성 에러');
      throw err;
    }
  }

  async getFile(fileName) {
    try {
      if (this.fileData[fileName] !== null) {
        return this.fileData[fileName];
      }

      const res = await fetch(dummy.fileUrl + fileName);
      if (res.status === 404) {
        throw { msg: await res.json() };
      }

      const { data } = await res.json();
      this.fileData[fileName] = data;
      return data;
    } catch (err) {
      err.msg ? alert(err.msg) : alert('파일 로드 에러');
      throw err;
    }
  }

  async saveFile(fileName, text) {
    try {
      const res = await fetch(dummy.fileUrl + fileName, {
        method: 'PUT',
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

      this.fileData[fileName] = text;
      alert('파일 저장 완료');
    } catch (err) {
      err.msg ? alert(err.msg) : alert('파일 저장 실패');
      throw err;
    }
  }

  async saveAsFile(oldFileName, newFileName, text) {
    try {
      const res = await fetch(dummy.fileUrl + oldFileName, {
        method: 'POST',
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

      this.fileData[newFileName] = text;
      delete this.fileData[oldFileName];

      alert('다른 이름으로 저장 완료');
    } catch (err) {
      err.msg ? alert(err.msg) : alert('저장 실패');
      throw err;
    }
  }

  async removeFile(fileName) {
    try {
      const res = await fetch(dummy.fileUrl + fileName, {
        method: 'DELETE',
      });

      if (res.status !== 200) {
        throw { msg: await res.json() };
      }

      delete this.fileData[fileName];
      alert('파일 삭제 완료');
    } catch (err) {
      err.msg ? alert(err.msg) : alert('파일 삭제 실패');
    }
  }
}
