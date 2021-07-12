export class ValidError extends Error {
  label;
  msg;
  constructor(err) {
    super();
    this.label = err.details[0].context.key;
    this.msg = this.#setMessage(err);
  }

  #setMessage() {
    switch (err.details[0].type) {
      case 'any.required':
        return `${this.label} 값을 입력하세요`;

      case 'string.base':
        return `${this.label} 은 문자만 입력 가능합니다`;

      case 'string.empty':
        return `${this.label} 에 공백은 허용되지 않습니다`;

      default:
        return `${this.label} 은 잘못된 값입니다.`;
    }
  }
}
