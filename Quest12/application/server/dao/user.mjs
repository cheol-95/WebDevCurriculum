import Sequelize from 'sequelize';
import crypto from 'crypto';

import { DaoError } from '../error/errorClass/dao.mjs';
const { DataTypes } = Sequelize;

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(80),
          allowNull: false,
          unique: false,
        },
        salt: {
          type: DataTypes.STRING.BINARY,
        },
      },
      {
        sequelize,
        tableName: 'user',
        modelName: 'User',
        paranoid: true,
        timestamps: false,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(Dao) {
    Dao.User.hasMany(Dao.File, {
      foreignKey: 'owner',
      sourceKey: 'id',
    });
  }

  static async getDigest(userPw, salt) {
    salt = salt ? salt : crypto.randomBytes(64).toString();

    return new Promise(async (resolve, reject) => {
      crypto.pbkdf2(userPw, salt, 3292, 64, 'sha512', (err, key) => {
        const password = key.toString('base64');
        resolve({ salt, password });
      });
    });
  }

  static async checkDigest(userId, userPw) {
    try {
      const row = await this.findOne({
        attributes: ['salt', 'password'],
        where: {
          email: userId,
        },
      });

      const { salt, password } = row.dataValues;
      const { password: digest } = await this.getDigest(userPw, salt);

      return digest === password ? true : false;
    } catch (err) {
      throw new DaoError(err);
    }
  }

  static async isExist(userId) {
    try {
      return await this.findOne({
        attributes: ['id'],
        where: {
          email: userId,
        },
      });
    } catch (err) {
      throw new DaoError(err);
    }
  }
}
