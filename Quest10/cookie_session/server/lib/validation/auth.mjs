import Joi from 'joi';

import setValidError from './validError.mjs';

export const login = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      id: Joi.string().required(),
      pw: Joi.string().required(),
    });

    await bodySchema.validateAsync(req.body);
    next();
  } catch (err) {
    setValidError(err, next);
  }
};
