import { Request, Response, NextFunction } from 'express';

import config from '../config/config';

export default (req: Request, res: Response, next: NextFunction): void => {
  res.set(config.CORS);
  next();
};
