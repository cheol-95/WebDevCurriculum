import { Model, Optional, DataTypes } from 'sequelize';

import sequelize from './sequelize';

interface FileAttributes {
  id: number;
  owner_id: number;
  name: string;
  text: string;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

export default class File
  extends Model<FileAttributes, FileCreationAttributes>
  implements FileAttributes {
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
  },
);
