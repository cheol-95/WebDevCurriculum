import config from '../config/config.mjs';

export const cors = (req, res, next) => {
  res.set(config.CORS);
  next();
};
