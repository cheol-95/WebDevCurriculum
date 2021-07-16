import { UserInputError } from 'apollo-server';

export const login = (userId: string, userPw: string): void => {
  if (!userId) {
    throw new UserInputError('id를 입력하세요', {
      argumentName: 'userId',
    });
  }

  if (!userPw) {
    throw new UserInputError('비밀번호를 입력하세요', {
      argumentName: 'userPw',
    });
  }

  if (userId.trim() === '') {
    throw new UserInputError('공백은 허용되지 않습니다', {
      argumentName: 'userId',
    });
  }

  if (userPw.trim() === '') {
    throw new UserInputError('공백은 허용되지 않습니다', {
      argumentName: 'userPw',
    });
  }
};
