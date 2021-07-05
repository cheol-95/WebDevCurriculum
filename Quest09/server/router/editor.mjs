import { asyncWrap } from '../lib/asyncWrap.mjs';
import * as controller from '../controller/editor.mjs';

import express from 'express';

export const editorRouter = express.Router();

editorRouter.get('/', asyncWrap(controller.getFileList));
editorRouter.post('/', asyncWrap(controller.createFile));

editorRouter.get('/:fileName', asyncWrap(controller.getFile));
editorRouter.post('/:fileName', asyncWrap(controller.saveAsFile));
editorRouter.put('/:fileName', asyncWrap(controller.saveFile));
editorRouter.delete('/:fileName', asyncWrap(controller.deleteFile));
