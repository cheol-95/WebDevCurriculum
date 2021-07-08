import dao from '../dao/auth.mjs';

export const checkSession = async (req, res, next) => {
  if (req.url.split('/')[2] === 'login' || req.method === 'OPTIONS') {
    return next();
  }

  if (await dao.checkSession(req.cookies.sessionId)) {
    return next();
  }

  return res.status(401).end();
};
