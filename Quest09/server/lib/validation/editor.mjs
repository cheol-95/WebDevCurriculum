import Joi from 'joi';

const setValidError = (err, next) => {
  err.from = 'validError';
  err.status = 422;

  const [detail] = err.details;

  switch (detail.type) {
    case 'any.required':
      err.label = detail.path[0];
      err.message = `값을 입력하세요`;
      break;

    case 'string.base':
      err.label = detail.context.label;
      err.message = `문자만 입력 가능합니다`;
      break;

    case 'string.empty':
      err.label = detail.context.label;
      err.message = `공백은 허용되지 않습니다`;
      break;

    default:
      err.label = detail.path[0] ? detail.path[0] : detail.context.label;
      err.message = `잘못된 값입니다.`;
  }
  next(err);
};

export const getFile = async (req, res, next) => {
  try {
    const paramSchema = Joi.object({
      fileName: Joi.string().required(),
    });

    await paramSchema.validateAsync(req.params);
    next();
  } catch (err) {
    setValidError(err, next);
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
    setValidError(err, next);
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
    setValidError(err, next);
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
    setValidError(err, next);
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
    setValidError(err, next);
  }
};
