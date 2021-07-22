"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoError = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const DaoError = (err) => {
    const message = setMessage(err);
    return new apollo_server_errors_1.ApolloError(message);
};
exports.DaoError = DaoError;
const setMessage = (err) => {
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
