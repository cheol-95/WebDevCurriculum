import userDao from '../dao/user.mjs';
import { CustomError } from '../error/errorClass/custom.mjs';
import { getAccessToken } from '../lib/auth.mjs';

export const login = async (userId, userPw) => {
  const row = await userDao.isExist(userId);
  if (!row) {
    throw new CustomError(404, '조회된 유저가 없습니다');
  }

  if (!(await userDao.checkDigest(userId, userPw))) {
    throw new CustomError(400, '비밀번호가 틀립니다');
  }

  return getAccessToken(row.dataValues.id);
};
