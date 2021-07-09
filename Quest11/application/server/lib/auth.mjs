import jwt from 'jsonwebtoken';
import config from '../config/config.mjs';

export const verify = async (req, res, next) => {
  if (req.url.split('/')[2] === 'login' || req.method === 'OPTIONS') {
    return next();
  }

  if (req.cookies.jwt) {
    try {
      req.jwt = req.cookies.jwt;
      req.user = await jwt.verify(req.jwt, config.JWT.secret);
      return next();
    } catch (err) {
      next({ from: 'jwt', msg: err });
    }
  }

  return res.status(401).end();
};

export const getAccessToken = (id, pw) => {
  const payload = { id, pw };
  const options = {
    issuer: 'knowre_server',
    subject: 'user_access',
    expiresIn: config.JWT.expires,
  };

  return jwt.sign(payload, config.JWT.secret, options);
};
