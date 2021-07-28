"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const setMessage = (err) => {
    switch (err.validatorKey) {
        case 'not_unique':
            return `${err.value} 는 중복된 파일명 입니다`;
        default:
            return '데이터 베이스 에러';
    }
};
exports.default = (err) => {
    const message = setMessage(err);
    return new apollo_server_errors_1.ApolloError(message);
};
