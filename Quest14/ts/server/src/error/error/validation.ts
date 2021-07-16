import { UserInputError } from 'apollo-server';

export const inputError = (err: any) => {
  const errorDetail = err.details[0];

  const label = errorDetail.context.key;
  const message = setMessage(label, errorDetail.type);

  return new UserInputError(message, { label });
};

const setMessage = (label: string, type: string): string => {
  switch (type) {
    case 'any.required':
      return `${label} 값을 입력하세요`;

    case 'string.base':
      return `${label} 은 문자만 입력 가능합니다`;

    case 'string.empty':
      return `${label} 에 공백은 허용되지 않습니다`;

    default:
      return `잘못된 입력입니다.`;
  }
};

// export class InputError {
//   #label;
//   #message;
//   constructor(err) {
//     this.#label = err.details[0].context.key;
//     this.#message = this.#setMessage(err.details[0].type);

//     return new UserInputError(this.#message, { label: this.#label });
//   }

//   #setMessage(type) {
//     switch (type) {
//       case 'any.required':
//         return `${this.label} 값을 입력하세요`;

//       case 'string.base':
//         return `${this.label} 은 문자만 입력 가능합니다`;

//       case 'string.empty':
//         return `${this.label} 에 공백은 허용되지 않습니다`;

//       default:
//         return `잘못된 입력입니다.`;
//     }
//   }
// }
