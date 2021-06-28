import * as picController from '../controller/pic.mjs';

export const picRouter = (req, res) => {
  req.path.parseUrl = req.path.parseUrl.replace(/^\/pic/, '');
  const { method } = req;

  if (/^\/upload$/.test(req.path.parseUrl)) {
    if (method === 'POST') {
      picController.picUpload(req, res);
    }
  }

  if (/^\/show$/.test(req.path.parseUrl)) {
    if (method === 'GET') {
      picController.picShow(req, res);
    }
  }

  if (/^\/download$/.test(req.path.parseUrl)) {
    if (method === 'GET') {
      picController.picDownload(req, res);
    }
  }
};
