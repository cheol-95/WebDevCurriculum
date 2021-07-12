export class DaoError extends Error {
  status;
  msg;
  constructor(err) {
    super();
    const meta = err.errors[0];
    this.status = 400;
    this.label = meta.path;
    this.msg = this.#setMessage(meta);
  }

  #setMessage(meta) {
    switch (meta.validatorKey) {
      case 'not_unique':
        return `${meta.value} 는 중복된 파일명 입니다`;

      default:
        // 미확인 에러
        return `시스템 장애`;
    }
  }
}
