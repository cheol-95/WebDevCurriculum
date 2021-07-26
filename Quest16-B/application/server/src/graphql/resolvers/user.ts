import { ApolloError } from 'apollo-server-errors';

import User from '../../dao/user';
import { getDigest, getAccessToken } from '../../lib/auth';
import loginValidation from '../../lib/validation/user';

interface UserArgs {
  userId: string;
  userPw: string;
}

export default {
  Mutation: {
    login: async (parent: any, args: UserArgs): Promise<string> => {
      const { userId, userPw } = args;
      loginValidation(userId, userPw);

      const row = await User.findOne({
        attributes: ['id', 'salt', 'password'],
        where: {
          email: userId,
        },
      });

      if (!row) {
        throw new ApolloError('조회된 유저가 없습니다');
      }

      const { id, salt, password } = row;
      const { digest } = await getDigest(userPw, salt);
      if (digest !== password) {
        throw new ApolloError('비밀번호가 틀립니다');
      }

      return getAccessToken(id);
    },
  },
};