import http from 'http';
import { router } from './router/index.mjs';
import { requestParser } from './util/parser.mjs';

const server = http.createServer((req, res) => {
  /* TODO: 각각의 URL들을 어떻게 처리하면 좋을까요? */
  requestParser(req);
  router(req, res);
});

server.listen(8080, () => {
  console.log('node server port: 8080\n');
});
