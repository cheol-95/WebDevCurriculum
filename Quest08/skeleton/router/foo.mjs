import * as fooController from '../controller/foo.mjs';

export const fooRouter = (req, res) => {
  req.path.parseUrl = req.path.parseUrl.replace(/^\/foo/, '');
  const { method } = req;

  if (/^\/?$/.test(req.path.parseUrl)) {
    if (method === 'GET') {
      fooController.fooGet(req, res);
    } else if (method === 'POST') {
      fooController.fooPost(req, res);
    }
  }
};
