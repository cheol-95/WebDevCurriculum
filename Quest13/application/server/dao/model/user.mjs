import Sequelize from 'sequelize';

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
}
