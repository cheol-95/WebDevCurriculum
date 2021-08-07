"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const date_fns_1 = require("date-fns");
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const getBody = (req) => (req.body ? req.body.query : undefined);
// morgan
const customFormat = '[:date[Asia/Seoul]] ":method :url HTTP/:http-version" :status ":referrer" :body';
morgan_1.default.token('date', () => date_fns_1.format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
morgan_1.default.token('body', (req) => getBody(req));
morgan_1.default.format('customFormat', customFormat);
// winston
const logDir = './logs';
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
const dailyRotateFileTransport = new winston_1.transports.DailyRotateFile({
    level: 'http',
    dirname: logDir,
    filename: 'info_%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});
const errorTransport = new winston_1.transports.DailyRotateFile({
    level: 'error',
    dirname: `${logDir}/error`,
    filename: 'error_%DATE%.log',
    datePattern: 'YYYY-MM-DD',
});
const logger = winston_1.createLogger({
    level: 'info',
    transports: [
        new winston_1.transports.Console({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf((info) => ` ${info.level}: ${info.message}`)),
        }),
        dailyRotateFileTransport,
        errorTransport,
    ],
});
exports.default = {
    write: (message) => {
        logger.info(message);
    },
};
