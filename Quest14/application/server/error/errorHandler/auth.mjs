import { AuthError } from '../errorClass/auth.mjs';

export const authErrorHandler = (err, req, res, next) => {
  console.log('123123');
  if (err instanceof AuthError) {
    console.log('INNER!!');
    res.status(err.status);
    delete err.status;
    return res.json(err);
  }

  next(err);
};
