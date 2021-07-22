"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class File extends sequelize_1.Model {
}
exports.File = File;
File.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    owner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'file',
    modelName: 'file',
    paranoid: true,
    timestamps: false,
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
});
// File.sync({})
//   .then(() => {
//     console.log('file 성공');
//   })
//   .catch(() => {
//     console.log('file 실패');
//   });
/////////////////////////////////////////////////////////////
// export default class File extends Sequelize.Model {
//   static init(sequelize: Sequelize.Sequelize) {
//     return super.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//           allowNull: false,
//           unique: true,
//         },
//         owner: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//         },
//         name: {
//           type: DataTypes.STRING(50),
//           allowNull: false,
//         },
//         text: {
//           type: DataTypes.STRING,
//         },
//       },
//       {
//         sequelize,
//         tableName: 'file',
//         modelName: 'File',
//         paranoid: true, // deleteAt > 얕은 삭제
//         timestamps: false,
//         underscored: true,
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',
//       }
//     );
//   }
//   static associate(Dao: Sequelize.Model) {
//     Dao.File.belongsTo(Dao.User, {
//       foreignKey: 'owner',
//       targetKey: 'id',
//     });
//   }
