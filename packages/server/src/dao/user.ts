import { Model, Optional, DataTypes } from 'sequelize';

import sequelize from './sequelize';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  salt: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export default class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;

  public email!: string;

  public password!: string;

  public salt!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: false,
    },
    salt: {
      type: DataTypes.STRING(70, true),
    },
  },
  {
    sequelize,
    tableName: 'user',
    modelName: 'user',
    paranoid: true,
    timestamps: false,
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  }
);

// User.sync({ force: true })
//   .then(() => {
//     console.log('user 성공');
//   })
//   .catch(() => {
//     console.log('user 실패');
//   });

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log('sequelize 성공');
//   })
//   .catch(() => {
//     console.log('sequelize 실패');
//   });

/// ///////////////////////////////////////////////////

// export default class User extends Model {
//   static init(sequelize: Sequelize) {
//     return super.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//           allowNull: false,
//           unique: true,
//         },
//         email: {
//           type: DataTypes.STRING(30),
//           allowNull: false,
//           unique: true,
//         },
//         password: {
//           type: DataTypes.STRING(80),
//           allowNull: false,
//           unique: false,
//         },
//         salt: {
//           type: DataTypes.STRING.BINARY,
//         },
//       },
//       {
//         sequelize,
//         tableName: 'user',
//         modelName: 'User',
//         paranoid: true,
//         timestamps: false,
//         underscored: true,
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',
//       }
//     );
//   }

//   static associate(Dao) {
//     Dao.User.hasMany(Dao.File, {
//       foreignKey: 'owner',
//       sourceKey: 'id',
//     });
//   }
// }

/// ///////////////////////////////////////////////////

// Project.init({
//   columnA: {
//     type: Sequelize.BOOLEAN,
//     validate: {
//       is: ['[a-z]','i'],        // will only allow letters
//       max: 23,                  // only allow values <= 23
//       isIn: {
//         args: [['en', 'zh']],
//         msg: "Must be English or Chinese"
//       }
//     },
//     field: 'column_a'
//     // Other attributes here
//   },
//   columnB: Sequelize.STRING,
//   columnC: 'MY VERY OWN COLUMN TYPE'
// }, {sequelize})

// sequelize.models.modelName
