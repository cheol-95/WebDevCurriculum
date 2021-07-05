import { asyncWrap } from '../lib/asyncWrap.mjs';
import * as validation from '../lib/validation/editor.mjs';
import * as controller from '../controller/editor.mjs';

import express from 'express';
export const editorRouter = express.Router();

editorRouter.get('/', asyncWrap(controller.getFileList));
editorRouter.post('/', validation.createFile, asyncWrap(controller.createFile));

editorRouter.get('/:fileName', validation.getFile, asyncWrap(controller.getFile));
editorRouter.post('/:fileName', validation.saveAsFile, asyncWrap(controller.saveAsFile));
editorRouter.put('/:fileName', validation.saveFile, asyncWrap(controller.saveFile));
editorRouter.delete('/:fileName', validation.deleteFile, asyncWrap(controller.deleteFile));
