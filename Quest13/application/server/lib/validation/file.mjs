import Joi from 'joi';

import { InputError } from '../../error/error/validation.mjs';

export const getFile = async (fileName) => {
  try {
    const schema = Joi.object({
      fileName: Joi.string().required(),
    });

    await schema.validateAsync({ fileName });
  } catch (err) {
    throw new InputError(err);
  }
};

export const createFile = async (newFileName) => {
  try {
    const schema = Joi.object({
      newFileName: Joi.string().required(),
    });

    await schema.validateAsync({ newFileName });
  } catch (err) {
    throw new InputError(err);
  }
};

export const saveFile = async (fileName, text) => {
  try {
    const schema = Joi.object({
      fileName: Joi.string().required(),
      text: Joi.string().allow('').required(),
    });

    await schema.validateAsync({ fileName, text });
  } catch (err) {
    throw new InputError(err);
  }
};

export const saveAsFile = async (oldFileName, newFileName, text) => {
  try {
    const schema = Joi.object({
      oldFileName: Joi.string().required(),
      newFileName: Joi.string().required(),
      text: Joi.string().allow('').required(),
    });

    await schema.validateAsync({ oldFileName, newFileName, text });
  } catch (err) {
    throw new InputError(err);
  }
};

export const deleteFile = async (fileName) => {
  try {
    const schema = Joi.object({
      fileName: Joi.string().required(),
    });

    await schema.validateAsync({ fileName });
  } catch (err) {
    throw new InputError(err);
  }
};
