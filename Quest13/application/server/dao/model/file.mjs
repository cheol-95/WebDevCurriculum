import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export default class File extends Sequelize.Model {
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
        owner: {
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
        modelName: 'File',
        paranoid: true, // deleteAt > 얕은 삭제
        timestamps: false,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(Dao) {
    Dao.File.belongsTo(Dao.User, {
      foreignKey: 'owner',
      targetKey: 'id',
    });
  }

  // static async getFileList(userId) {
  //   try {
  //     return await this.findAll({
  //       attributes: ['name'],
  //       where: {
  //         owner: userId,
  //       },
  //     });
  //   } catch (err) {
  //     throw new DaoError(err);
  //   }
  // }

  // static async getFile(userId, fileName) {
  //   try {
  //     return await this.findOne({
  //       attribute: ['text'],
  //       where: {
  //         owner: userId,
  //         name: fileName,
  //       },
  //     });
  //   } catch (err) {
  //     throw new DaoError(err);
  //   }
  // }

  // static async createFile(userId, fileName) {
  //   try {
  //     return await this.create({
  //       owner: userId,
  //       name: fileName,
  //       text: '',
  //     });
  //   } catch (err) {
  //     throw new DaoError(err);
  //   }
  // }

  // static async saveFile(userId, fileName, data) {
  //   try {
  //     return await this.update(
  //       {
  //         text: data,
  //       },
  //       {
  //         where: {
  //           owner: userId,
  //           name: fileName,
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     throw new DaoError(err);
  //   }
  // }

  // static async renameFile(userId, oldFileName, newFileName, data) {
  //   try {
  //     return await this.update(
  //       {
  //         name: newFileName,
  //         text: data,
  //       },
  //       {
  //         where: {
  //           owner: userId,
  //           name: oldFileName,
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     throw new DaoError(err);
  //   }
  // }

  // static async deleteFile(userId, deleteFileName) {
  //   try {
  //     return await this.destroy({
  //       where: {
  //         owner: userId,
  //         name: deleteFileName,
  //       },
  //     });
  //   } catch (err) {
  //     throw new DaoError(err);
  //   }
  // }
}
