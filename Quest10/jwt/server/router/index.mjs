import express from 'express';
import { editorRouter } from './editor.mjs';
import { authRouter } from './auth.mjs';

export const router = express.Router();

router.use('/file', editorRouter);
router.use('/auth', authRouter);
