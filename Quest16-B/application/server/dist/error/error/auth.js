"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const setMessage = (err) => {
    switch (err.message) {
        case 'jwt expired':
            return '만료된 토큰입니다';
        case 'jwt not exist':
            return '토큰이 입력되지 않았습니다';
        case 'jwt malformed':
            return '토큰 형식이 잘못되었습니다';
        case 'invalid signature':
            return '서명이 올바르지 않습니다';
        default:
            return '인증 에러';
    }
};
exports.default = (err) => {
    const message = setMessage(err);
    return new apollo_server_errors_1.AuthenticationError(message);
};
