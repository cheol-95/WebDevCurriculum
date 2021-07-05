import Joi from 'joi';

export const getFile = async (req, res, next) => {
  try {
    const paramSchema = Joi.object({
      fileName: Joi.string().required(),
    });

    await paramSchema.validateAsync(req.params);
    next();
  } catch (err) {
    next(err);
  }
};

export const createFile = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      newFileName: Joi.string().required(),
    });

    await bodySchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const saveFile = async (req, res, next) => {
  try {
    const paramSchema = Joi.object({
      fileName: Joi.string().required(),
    });

    const bodySchema = Joi.object({
      data: Joi.string().allow('').required(),
    });

    await paramSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const saveAsFile = async (req, res, next) => {
  try {
    const paramSchema = Joi.object({
      fileName: Joi.string().required(),
    });

    const bodySchema = Joi.object({
      newFileName: Joi.string().required(),
      data: Joi.string().allow('').required(),
    });

    await paramSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  try {
    const paramSchema = Joi.object({
      fileName: Joi.string().required(),
    });

    await paramSchema.validateAsync(req.params);
    next();
  } catch (err) {
    next(err);
  }
};
