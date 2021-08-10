// import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

import config from '../config/config';
import AuthError from '../error/error/auth';

export const jwtVerify = async (req: Request | any): Promise<any> => {
  const { authorization } = req.headers;
  if (!authorization) {
    return null;
  }

  const token = authorization.substr(7);
  if (['null', 'undefined'].includes(token)) {
    return null;
  }

  try {
    return jwt.verify(token, config.JWT.secret);
  } catch (err) {
    throw AuthError(err);
  }
};

// export const getAccessToken = (id: number): string => {
//   const payload = { id };
//   const options = {
//     issuer: 'knowre_server',
//     subject: 'user_access',
//     expiresIn: config.JWT.expires,
//   };

//   return jwt.sign(payload, config.JWT.secret, options);
// };

// export const getDigest = (userPw: string, salt: any): Promise<any> => {
//   const useSalt = salt || crypto.randomBytes(64).toString();

//   return new Promise((resolve) => {
//     crypto.pbkdf2(userPw, useSalt, 3292, 64, 'sha512', (err, key) => {
//       const digest = key.toString('base64');
//       resolve({ useSalt, digest });
//     });
//   });
// };
