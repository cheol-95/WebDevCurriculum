import validErrorHandler from './validation.mjs';
import fsErrorHandler from './fs.mjs';

export const errorHandler = (err, req, res, next) => {
  // Common Error Logic ?

  if (err.from === 'validError') {
    return validErrorHandler(err, res);
  }

  if (err.code) {
    return fsErrorHandler(err, res);
  }

  next(err);
};
