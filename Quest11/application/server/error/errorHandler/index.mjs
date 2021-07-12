import { validErrorHandler } from './validation.mjs';
import { customErrorHandler } from './custom.mjs';
import { authErrorHandler } from './auth.mjs';
import { daoErrorHandler } from './dao.mjs';

export const errorHandler = (app) => {
  app.use(validErrorHandler);
  app.use(customErrorHandler);
  app.use(authErrorHandler);
  app.use(daoErrorHandler);

  app.use((err, req, res, next) => {
    console.log('## err: ', err);
    return res.status(500).json(err);
  });
};
