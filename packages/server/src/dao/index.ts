import User from './user';
import File from './file';

// import { getDigest } from '../lib/auth';
// import sequelize from './sequelize';

User.hasMany(File, {
  sourceKey: 'id',
  foreignKey: 'owner_id',
});

File.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'owner_id',
});

export { User, File };

// (async () => {
//   await sequelize.sync({});

//   const isData = await User.findOne({ where: { email: 'test1' } });
//   if (!isData) {
//     try {
//       ['test1', 'test2', 'test3'].forEach(async (email) => {
//         const { userSalt, digest: password } = await getDigest(email, null);
//         await User.create({
//           email,
//           password,
//           salt: userSalt,
//         });
//       });
//     } catch (err) {
//       /* eslint-disable-next-line no-console */
//       console.log('err: ', err);
//     }
//   }
// })();
