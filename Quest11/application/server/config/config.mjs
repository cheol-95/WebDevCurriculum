// 과제 공유를 위해 환경변수를 사용하지 않았습니다.
import path from 'path';

export default {
  PORT: 8000,
  FILEPATH: path.resolve() + '/public/text/',
  CORS: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, ',
  },
  JWT: {
    secret: 'knowre',
    // expires: 20, //
    expires: 1000 * 60 * 15, // 15분
  },
};
