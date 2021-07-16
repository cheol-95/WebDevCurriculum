import { AuthenticationError } from 'apollo-server-errors';

export const AuthError = (err: any) => {
  const message = setMessage(err);

  return new AuthenticationError(message);
};

const setMessage = (err: any): string => {
  switch (err.message) {
    case 'jwt expired':
      return `만료된 토큰입니다`;

    case 'jwt not exist':
      return `토큰이 입력되지 않았습니다`;

    case 'jwt malformed':
      return `토큰 형식이 잘못되었습니다`;

    case 'invalid signature':
      return `서명이 올바르지 않습니다`;

    default:
      return `인증 에러`;
  }
};

// export class AuthError {
//   #message;
//   constructor(err: any) {
//     this.#message = this.setMessage(err);

//     return new AuthenticationError(this.#message);
//   }

//   private setMessage(err: any): string {
//     switch (err.message) {
//       case 'jwt expired':
//         return `만료된 토큰입니다`;

//       case 'jwt not exist':
//         return `토큰이 입력되지 않았습니다`;

//       case 'jwt malformed':
//         return `토큰 형식이 잘못되었습니다`;

//       case 'invalid signature':
//         return `서명이 올바르지 않습니다`;

//       default:
//         return `인증 에러`;
//     }
//   }
// }
