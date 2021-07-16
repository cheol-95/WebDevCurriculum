"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const user_1 = require("../../dao/user");
const auth_1 = require("../../lib/auth");
const validation = __importStar(require("../../lib/validation/user"));
const auth_2 = require("../../lib/auth");
exports.default = {
    Mutation: {
        login: async (parent, { userId, userPw }) => {
            validation.login(userId, userPw);
            const row = await user_1.User.findOne({
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
            return await auth_2.getAccessToken(id);
        },
    },
};
