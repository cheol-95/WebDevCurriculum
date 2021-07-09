import * as authService from '../service/auth.mjs';
import config from '../config/config.mjs';

export const login = async (req, res) => {
  const { id: userId, pw: userPw } = req.body;
  const jwt = await authService.login(userId, userPw);

  res.cookie('jwt', jwt, {
    maxAge: config.JWT.expires,
    httpOnly: true,
    path: '/',
  });

  return res.status(200).json();
};

export const logout = async (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json();
};
