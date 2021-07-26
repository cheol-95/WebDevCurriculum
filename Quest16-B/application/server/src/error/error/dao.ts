import { ApolloError } from 'apollo-server-errors';

const setMessage = (err: any) => {
  switch (err.validatorKey) {
    case 'not_unique':
      return `${err.value} 는 중복된 파일명 입니다`;

    default:
      return '데이터 베이스 에러';
  }
};

export default (err: any) => {
  const message = setMessage(err);

  return new ApolloError(message);
};
