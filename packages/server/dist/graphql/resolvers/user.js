"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const user_1 = __importDefault(require("../../dao/user"));
const auth_1 = require("../../lib/auth");
const user_2 = __importDefault(require("../../lib/validation/user"));
exports.default = {
    Mutation: {
        login: async (parent, args) => {
            const { userId, userPw } = args;
            user_2.default(userId, userPw);
            const row = await user_1.default.findOne({
                attributes: ['id', 'salt', 'password'],
                where: {
                    email: userId,
                },
            });
            if (!row) {
                throw new apollo_server_errors_1.ApolloError('조회된 유저가 없습니다');
            }
            const { id, salt, password } = row;
            const { digest } = await auth_1.getDigest(userPw, salt);
            if (digest !== password) {
                throw new apollo_server_errors_1.ApolloError('비밀번호가 틀립니다');
            }
            return auth_1.getAccessToken(id);
        },
    },
};
