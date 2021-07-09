import dao from '../dao/auth.mjs';
import { getAccessToken } from '../lib/auth.mjs';

export const login = async (userId, userPw) => {
  await dao.login(userId, userPw);
  return await getAccessToken(userId, userPw);
};
