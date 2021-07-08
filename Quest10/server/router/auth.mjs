import express from 'express';

import { asyncWrap } from '../lib/asyncWrap.mjs';
import * as validation from '../lib/validation/auth.mjs';
import * as controller from '../controller/auth.mjs';

export const authRouter = express.Router();

authRouter.post('/login', validation.login, asyncWrap(controller.login));
