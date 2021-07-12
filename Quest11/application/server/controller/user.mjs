import * as userService from '../service/user.mjs';

export const login = async (req, res) => {
  const { id: userId, pw: userPw } = req.body;
  const jwt = await userService.login(userId, userPw);
  return res.status(200).json({ jwt });
};
