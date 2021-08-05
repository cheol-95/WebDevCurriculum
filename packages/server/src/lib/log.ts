import fs from 'fs';
import morgan from 'morgan';
import { format as _format } from 'date-fns';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const getBody = (req: any) => (req.body ? req.body.query : undefined);

// morgan
const customFormat = '[:date[Asia/Seoul]] ":method :url HTTP/:http-version" :status ":referrer" :body';

morgan.token('date', () => _format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
morgan.token('body', (req) => getBody(req));
morgan.format('customFormat', customFormat);

// winston
const logDir = './logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: 'http',
  dirname: logDir,
  filename: 'info_%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const errorTransport = new transports.DailyRotateFile({
  level: 'error',
  dirname: `${logDir}/error`,
  filename: 'error_%DATE%.log',
  datePattern: 'YYYY-MM-DD',
});

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf((info) => ` ${info.level}: ${info.message}`),
      ),
    }),
    dailyRotateFileTransport,
    errorTransport,
  ],
});

export default {
  write: (message: any) => {
    logger.info(message);
  },
};
