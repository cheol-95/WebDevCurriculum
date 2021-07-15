import { CustomError } from '../errorClass/custom.mjs';

export const customErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status);
    delete err.status;
    return res.json(err);
  }

  next(err);
};
