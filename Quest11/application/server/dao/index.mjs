import Sequelize from 'sequelize';
import crypto from 'crypto';

import File from './file.mjs';
import User from './user.mjs';

class Dao {
  User;
  File;
  sequelize;
  constructor() {
    this.#init();
  }

  async #init() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './db.sqlite',
      logging: false,
    });

    this.User = User;
    this.File = File;

    this.User.init(this.sequelize);
    this.File.init(this.sequelize);

    User.associate(this);
    File.associate(this);

    await this.sequelize.sync({});
    // await this.sequelize.sync({ force: true });
    // await this.#setDummy();
  }

  async #setDummy() {
    const isData = await this.User.findOne({ where: { email: 'test1' } });
    if (!isData) {
      await User.bulkCreate([
        {
          email: 'test1',
          ...(await this.User.getDigest('test1', 'test1')),
        },
        {
          email: 'test2',
          ...(await this.User.getDigest('test2', 'test2')),
        },
        {
          email: 'test3',
          ...(await this.User.getDigest('test3', 'test3')),
        },
      ]);
    }
  }
}

export default new Dao();
