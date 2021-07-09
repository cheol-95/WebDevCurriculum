import dao from '../dao/auth.mjs';
import * as uuid from 'uuid';

export const login = async (userId, userPw) => {
  const sessionId = uuid.v4();
  await dao.login(userId, userPw);
  await dao.setSession(userId, sessionId);
  return sessionId;
};

export const logout = async (sessionId) => {
  await dao.deleteSession(sessionId);
};
