import { Model, Optional, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';

interface FileAttributes {
  id: number;
  owner_id: number;
  name: string;
  text: string;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

export class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
  public id!: number;
  public owner_id!: number;
  public name!: string;
  public text!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'file',
    modelName: 'file',
    paranoid: true, // deleteAt > 얕은 삭제
    timestamps: false,
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  }
);

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
