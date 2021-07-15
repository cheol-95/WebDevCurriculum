import Dao from '../../dao/index.mjs';
import { getDigest } from '../../lib/auth.mjs';
import { CustomError } from '../../error/error/custom.mjs';
import * as validation from '../../lib/validation/user.mjs';
import { getAccessToken } from '../../lib/auth.mjs';

const { User: userDao } = Dao;

export default {
  Mutation: {
    login: async (parent, { userId, userPw }) => {
      validation.login(userId, userPw);

      const row = await userDao.findOne({
        attributes: ['id', 'salt', 'password'],
        where: {
          email: userId,
        },
      });

      if (!row) {
        throw new CustomError(404, '조회된 유저가 없습니다');
      }

      const { id, salt, password } = row.dataValues;
      const { digest } = await getDigest(userPw, salt);
      if (digest !== password) {
        throw new CustomError(404, '비밀번호가 틀렸습니다');
      }

      return await getAccessToken(id);
    },
  },
};
