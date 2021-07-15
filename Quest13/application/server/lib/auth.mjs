import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import config from '../config/config.mjs';
import { AuthError } from '../error/error/auth.mjs';

export const jwtVerify = async ({ headers: { authorization } }) => {
  if (!authorization) {
    return null;
  }

  const token = authorization.substr(7);
  if (['null', 'undefined'].includes(token)) {
    return null;
  }

  try {
    return await jwt.verify(token, config.JWT.secret);
  } catch (err) {
    throw new AuthError(err);
  }
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

export const getDigest = (userPw, salt) => {
  salt = salt || crypto.randomBytes(64).toString();

  return new Promise(async (resolve, reject) => {
    crypto.pbkdf2(userPw, salt, 3292, 64, 'sha512', (err, key) => {
      const digest = key.toString('base64');
      resolve({ salt, digest });
    });
  });
};
