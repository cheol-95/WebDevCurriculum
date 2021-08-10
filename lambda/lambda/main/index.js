const { login } = require('./jwt.js');

exports.handler = async ({ userId, userPw }) => {
  try {
    const jwt = await login(userId, userPw);
    return {
      data: {
        login: jwt,
      },
    };
  } catch (err) {
    return err;
  }
};
