// 과제 공유를 위해 환경변수를 사용하지 않았습니다.
import path from 'path';

export default {
  PORT: 8000,
  FILEPATH: path.resolve() + '/public/text/',
  CORS: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': '*',
  },
};
