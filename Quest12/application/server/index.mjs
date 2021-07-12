import https from 'https';
import morgan from 'morgan';
import express from 'express';

import config from './config/config.mjs';
import { cors } from './lib/cors.mjs';
import { verify } from './lib/auth.mjs';
import { router } from './router/index.mjs';
import { errorHandler } from './error/errorHandler/index.mjs';
import './dao/index.mjs';

const { PORT, SSL } = config;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use(verify);

app.use('/', router);
errorHandler(app);

const server = https.createServer(SSL, app);
server.listen(PORT, () => {
  console.log(`server on ${PORT} port`);
});
