import express from 'express';
import morgan from 'morgan';

import config from './config/config.mjs';
import { router } from './router/index.mjs';
import { errorHandler } from './errorHandler/index.mjs';
import { cors } from './lib/cors.mjs';

const { PORT } = config;
const app = express();

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('./public'));
app.use('/', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server on ${PORT} port`);
});
