import Joi from 'joi';

import { inputError } from '../../error/error/validation';

export const getFile = async (fileName: string) => {
  try {
    const schema = Joi.object({
      fileName: Joi.string().required(),
    });

    await schema.validateAsync({ fileName });
  } catch (err) {
    throw inputError(err);
  }
};

export const createFile = async (newFileName: string) => {
  try {
    const schema = Joi.object({
      newFileName: Joi.string().required(),
    });

    await schema.validateAsync({ newFileName });
  } catch (err) {
    throw inputError(err);
  }
};

export const saveFile = async (fileName: string, text: string) => {
  try {
    const schema = Joi.object({
      fileName: Joi.string().required(),
      text: Joi.string().allow('').required(),
    });

    await schema.validateAsync({ fileName, text });
  } catch (err) {
    throw inputError(err);
  }
};

export const saveAsFile = async (oldFileName: string, newFileName: string, text: string) => {
  try {
    const schema = Joi.object({
      oldFileName: Joi.string().required(),
      newFileName: Joi.string().required(),
      text: Joi.string().allow('').required(),
    });

    await schema.validateAsync({ oldFileName, newFileName, text });
  } catch (err) {
    throw inputError(err);
  }
};

export const deleteFile = async (fileName: string) => {
  try {
    const schema = Joi.object({
      fileName: Joi.string().required(),
    });

    await schema.validateAsync({ fileName });
  } catch (err) {
    throw inputError(err);
  }
};
