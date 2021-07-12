import express from 'express';

import { asyncWrap } from '../lib/asyncWrap.mjs';
import * as validation from '../lib/validation/user.mjs';
import * as controller from '../controller/user.mjs';

export const userRouter = express.Router();

userRouter.post('/login', validation.login, asyncWrap(controller.login));
