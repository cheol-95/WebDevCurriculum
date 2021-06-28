import { fooRouter } from './foo.mjs';
import { picRouter } from './pic.mjs';

export const router = (req, res) => {
  if (/^\/$/.test(req.path.parseUrl)) {
    emptyUrl(req, res);
  } else if (/^\/foo/.test(req.path.parseUrl)) {
    fooRouter(req, res);
  } else if (/^\/pic/.test(req.path.parseUrl)) {
    picRouter(req, res);
  }
};

const emptyUrl = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World!');
  res.end();
};
