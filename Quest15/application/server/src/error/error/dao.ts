import { ApolloError } from 'apollo-server-errors';

export const DaoError = (err: any) => {
  const message = setMessage(err);

  return new ApolloError(message);
};

const setMessage = (err: any) => {
  switch (err.validatorKey) {
    case 'not_unique':
      return `${err.value} 는 중복된 파일명 입니다`;

    default:
      return `데이터 베이스 에러`;
  }
};

// export class DaoError {
//   #message;
//   constructor(err: any) {
//     this.#message = this.#setMessage(err);

//     return new ApolloError(this.#message);
//   }

//   #setMessage(err) {
//     switch (meta.validatorKey) {
//       case 'not_unique':
//         return `${meta.value} 는 중복된 파일명 입니다`;

//       default:
//         // 미확인 에러
//         return `데이터 베이스 에러`;
//     }
//   }
// }
