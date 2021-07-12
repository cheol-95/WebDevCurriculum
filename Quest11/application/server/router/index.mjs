import express from 'express';
import { fileRouter } from './file.mjs';
import { userRouter } from './user.mjs';

export const router = express.Router();

router.use('/file', fileRouter);
router.use('/user', userRouter);
