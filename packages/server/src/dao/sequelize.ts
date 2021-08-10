import { Sequelize } from 'sequelize';

export default new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: './db.sqlite',
});
