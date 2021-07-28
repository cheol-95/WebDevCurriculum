"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const setMessage = (label, type) => {
    switch (type) {
        case 'any.required':
            return `${label} 값을 입력하세요`;
        case 'string.base':
            return `${label} 은 문자만 입력 가능합니다`;
        case 'string.empty':
            return `${label} 에 공백은 허용되지 않습니다`;
        default:
            return '잘못된 입력입니다.';
    }
};
exports.default = (err) => {
    const errorDetail = err.details[0];
    const label = errorDetail.context.key;
    const message = setMessage(label, errorDetail.type);
    return new apollo_server_1.UserInputError(message, { label });
};
