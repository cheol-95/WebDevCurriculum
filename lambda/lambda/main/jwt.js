const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { getLoginData } = require('./mysql.js');
const { customLoginError } = require('./error.js');

const getAccessToken = (id) => {
  const payload = { id };
  const options = {
    issuer: 'knowre_server',
    subject: 'user_access',
    expiresIn: process.env.EXPIRES,
  };
  return jwt.sign(payload, process.env.SECRET, options);
};

const getDigest = (userPw, salt) => {
  const useSalt = salt || crypto.randomBytes(64).toString();
  return new Promise((resolve) => {
    crypto.pbkdf2(userPw, useSalt, 3292, 64, 'sha512', (err, key) => {
      const digest = key.toString('base64');
      resolve({ useSalt, digest });
    });
  });
};

const login = async (userId, userPw) => {
  const rows = await getLoginData(userId);
  if (rows.length === 0) {
    throw customLoginError('조회된 유저가 없습니다');
  }

  const { id, salt, password } = rows[0];
  const { digest } = await getDigest(userPw, salt);
  if (digest !== password) {
    throw customLoginError('비밀번호가 틀립니다');
  }

  return getAccessToken(id);
};

module.exports = {
  login,
};
