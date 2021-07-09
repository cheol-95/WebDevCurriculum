import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import config from './config/config.mjs';
import { cors } from './lib/cors.mjs';
import { checkSession } from './lib/auth.mjs';
import { router } from './router/index.mjs';
import { errorHandler } from './errorHandler/index.mjs';

const { PORT } = config;
const app = express();

app.use(cors);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkSession);

app.use('/', router);
app.use(errorHandler);

app.listen(PORT, () => {});
