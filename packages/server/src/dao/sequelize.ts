import { Sequelize } from 'sequelize';

import config from '../config/config';

export default new Sequelize(config.DB.database, config.DB.username, config.DB.password, {
  host: config.DB.host,
  port: config.DB.port,
  dialect: 'mysql',
});
