import { ApolloError } from 'apollo-server-errors';

export class DaoError {
  #message;
  constructor(err) {
    this.#message = this.#setMessage(meta);

    return new ApolloError(this.#message);
  }

  #setMessage(meta) {
    switch (meta.validatorKey) {
      case 'not_unique':
        return `${meta.value} 는 중복된 파일명 입니다`;

      default:
        // 미확인 에러
        return `데이터 베이스 에러`;
    }
  }
}
