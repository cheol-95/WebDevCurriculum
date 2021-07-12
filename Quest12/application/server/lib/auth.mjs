import jwt from 'jsonwebtoken';
import config from '../config/config.mjs';
import { AuthError } from '../error/errorClass/auth.mjs';

export const verify = async (req, res, next) => {
  if (['login', 'logout'].includes(req.url.split('/')[2]) || req.method === 'OPTIONS') {
    return next();
  }

  if (req.headers.authorization) {
    try {
      req.jwt = req.headers.authorization.split(' ')[1];
      req.user = await jwt.verify(req.jwt, config.JWT.secret);
      return next();
    } catch (err) {
      next(new AuthError(err));
    }
  }

  return res.status(401).end();
};

export const getAccessToken = (id) => {
  const payload = { id };
  const options = {
    issuer: 'knowre_server',
    subject: 'user_access',
    expiresIn: config.JWT.expires,
  };

  return jwt.sign(payload, config.JWT.secret, options);
};
