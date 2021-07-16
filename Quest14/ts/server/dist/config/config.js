"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 과제 공유를 위해 환경변수를 사용하지 않았습니다.
const fs_1 = __importDefault(require("fs"));
exports.default = {
    PORT: 8000,
    CORS: {
        'Access-Control-Allow-Origin': 'https://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, ',
    },
    JWT: {
        secret: 'knowre',
        expires: 1000 * 60 * 15, // 15분
        // expires: 1,
    },
    SSL: {
        key: fs_1.default.readFileSync('../openssl/localhost.key'),
        cert: fs_1.default.readFileSync('../openssl/localhost.crt'),
    },
};
