import express from 'express';

import { asyncWrap } from '../lib/asyncWrap.mjs';
import * as validation from '../lib/validation/file.mjs';
import * as controller from '../controller/file.mjs';

export const fileRouter = express.Router();

fileRouter.get('/', asyncWrap(controller.getFileList));
fileRouter.post('/', validation.createFile, asyncWrap(controller.createFile));

fileRouter.get('/:fileName', validation.getFile, asyncWrap(controller.getFile));
fileRouter.post('/:fileName', validation.saveAsFile, asyncWrap(controller.saveAsFile));
fileRouter.put('/:fileName', validation.saveFile, asyncWrap(controller.saveFile));
fileRouter.delete('/:fileName', validation.deleteFile, asyncWrap(controller.deleteFile));
