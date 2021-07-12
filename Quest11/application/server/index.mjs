import express from 'express';
import morgan from 'morgan';

import config from './config/config.mjs';
import { cors } from './lib/cors.mjs';
import { verify } from './lib/auth.mjs';
import { router } from './router/index.mjs';
import { errorHandler } from './error/errorHandler/index.mjs';
import './dao/index.mjs';

const { PORT } = config;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use(verify);

app.use('/', router);
errorHandler(app);

app.listen(PORT, () => {});
