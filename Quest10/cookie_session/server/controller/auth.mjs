import * as authService from '../service/auth.mjs';

export const login = async (req, res) => {
  const { id: userId, pw: userPw } = req.body;

  const sessionId = await authService.login(userId, userPw);

  res.cookie('sessionId', sessionId, {
    maxAge: 1000 * 60 * 15, // 10초
    httpOnly: true,
    path: '/',
  });

  return res.status(200).json();
};

export const logout = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  await authService.logout(sessionId);

  res.clearCookie('sessionId', sessionId);
  return res.status(200).json();
};
