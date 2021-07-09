import validErrorHandler from './validation.mjs';
import fsErrorHandler from './fs.mjs';

export const errorHandler = (err, req, res, next) => {
  console.log('err: ', err);
  // Common Error Logic. ex)logging?

  if (err.from === 'validError') {
    return validErrorHandler(err, res);
  }

  if (err.from === 'authDao') {
    // return DaoError()
    return res.status(400).json(err.msg);
  }

  if (err.code) {
    return fsErrorHandler(err, res);
  }

  next(err);
};
