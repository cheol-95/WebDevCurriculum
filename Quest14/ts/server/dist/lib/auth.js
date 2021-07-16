"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDigest = exports.getAccessToken = exports.jwtVerify = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const auth_1 = require("../error/error/auth");
const jwtVerify = async (req) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return null;
    }
    const token = authorization.substr(7);
    if (['null', 'undefined'].includes(token)) {
        return null;
    }
    try {
        return await jsonwebtoken_1.default.verify(token, config_1.default.JWT.secret);
    }
    catch (err) {
        throw auth_1.AuthError(err);
    }
};
exports.jwtVerify = jwtVerify;
const getAccessToken = (id) => {
    const payload = { id };
    const options = {
        issuer: 'knowre_server',
        subject: 'user_access',
        expiresIn: config_1.default.JWT.expires,
    };
    return jsonwebtoken_1.default.sign(payload, config_1.default.JWT.secret, options);
};
exports.getAccessToken = getAccessToken;
const getDigest = (userPw, salt) => {
    salt = salt || crypto_1.default.randomBytes(64).toString();
    return new Promise(async (resolve, reject) => {
        crypto_1.default.pbkdf2(userPw, salt, 3292, 64, 'sha512', (err, key) => {
            const digest = key.toString('base64');
            resolve({ salt, digest });
        });
    });
};
exports.getDigest = getDigest;
