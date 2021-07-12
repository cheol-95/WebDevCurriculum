// 과제 공유를 위해 환경변수를 사용하지 않았습니다.
import path from 'path';
import fs from 'fs';

export default {
  PORT: 8000,
  FILEPATH: path.resolve() + '/public/text/',
  CORS: {
    'Access-Control-Allow-Origin': 'https://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, ',
  },
  JWT: {
    secret: 'knowre',
    expires: 1000 * 60 * 15, // 15분
  },
  SSL: {
    key: fs.readFileSync('../openssl/localhost.key'),
    cert: fs.readFileSync('../openssl/localhost.crt'),
  },
};
