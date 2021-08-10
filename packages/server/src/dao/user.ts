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
  implements UserAttributes {
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
      type: DataTypes.STRING(100),
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
  },
);
