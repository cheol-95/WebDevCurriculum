import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: './db.sqlite',
});

// class Dao {
//   User: any;
//   File: any;
//   sequelize: any;
//   constructor() {
//     this.init();
//   }

//   private async init() {
//     this.sequelize = new Sequelize({
//       dialect: 'sqlite',
//       storage: './db.sqlite',
//       logging: false,
//     });

//     this.User = User;
//     this.File = File;

//     this.User.init(this.sequelize);
//     this.File.init(this.sequelize);

//     User.associate(this);
//     File.associate(this);

//     await this.sequelize.sync({});
// await this.sequelize.sync({ force: true });
// await this.setDummy();
// }

// private async setDummy() {
//   const isData = await this.User.findOne({ where: { email: 'test1' } });
//   if (!isData) {
//     await User.bulkCreate([
//       {
//         email: 'test1',
//         ...(await this.User.getDigest('test1', 'test1')),
//       },
//       {
//         email: 'test2',
//         ...(await this.User.getDigest('test2', 'test2')),
//       },
//       {
//         email: 'test3',
//         ...(await this.User.getDigest('test3', 'test3')),
//       },
//     ]);
//   }
// }
// }

// export default new Dao();
