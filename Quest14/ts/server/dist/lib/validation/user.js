"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const apollo_server_1 = require("apollo-server");
const login = (userId, userPw) => {
    if (!userId) {
        throw new apollo_server_1.UserInputError('id를 입력하세요', {
            argumentName: 'userId',
        });
    }
    if (!userPw) {
        throw new apollo_server_1.UserInputError('비밀번호를 입력하세요', {
            argumentName: 'userPw',
        });
    }
    if (userId.trim() === '') {
        throw new apollo_server_1.UserInputError('공백은 허용되지 않습니다', {
            argumentName: 'userId',
        });
    }
    if (userPw.trim() === '') {
        throw new apollo_server_1.UserInputError('공백은 허용되지 않습니다', {
            argumentName: 'userPw',
        });
    }
};
exports.login = login;
