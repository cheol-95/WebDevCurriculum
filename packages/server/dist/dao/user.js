"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(70),
        allowNull: false,
        unique: false,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING(70, true),
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'user',
    modelName: 'user',
    paranoid: true,
    timestamps: false,
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
});
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
