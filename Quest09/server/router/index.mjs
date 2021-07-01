import express from 'express';
import { editorRouter } from './editor.mjs';

export const router = express.Router();

router.use('/file', editorRouter);
