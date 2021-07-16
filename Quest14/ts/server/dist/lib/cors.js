"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const config_1 = __importDefault(require("../config/config"));
const cors = (req, res, next) => {
    res.set(config_1.default.CORS);
    next();
};
exports.cors = cors;
