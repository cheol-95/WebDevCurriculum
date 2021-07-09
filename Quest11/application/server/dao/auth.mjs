import path from 'path';
import fsp from 'fs/promises';

class Dao {
  #userDB = path.resolve() + '/dao/user.txt';
  constructor() {}

  async #readData(DB) {
    const data = await fsp.readFile(DB, 'utf8');
    return JSON.parse(data);
  }

  // async #writeData(DB, data) {
  //   await fsp.writeFile(DB, JSON.stringify(data));
  // }

  async login(userId, userPw) {
    try {
      const rows = await this.#readData(this.#userDB);

      const userIdList = rows.map((row) => row.user_id);
      if (!userIdList.includes(userId)) {
        throw this.#throwErr('id', '일치하는 ID가 없습니다');
      }

      for (const row of rows) {
        if (userId === row.user_id && userPw !== row.user_pw) {
          throw this.#throwErr('pw', '비밀번호가 틀렸습니다');
        }
      }
    } catch (err) {
      throw err;
    }
  }

  #throwErr(label, msg) {
    return {
      from: 'authDao',
      label,
      msg,
    };
  }
}

export default new Dao();
