import morgan from 'morgan';
import express from 'express';

import { bootLog } from './lib/elasticSearch/index';

import apolloServer from './graphql/index';
import config from './config/config';
import cors from './lib/cors';
import stream from './lib/log';

// Elasticsearch

const { PORT } = config;
const app = express();

app.use(morgan('customFormat', { stream }));
app.use(cors);

app.get('/', (req, res) => {
  res.send('Hello');
});

apolloServer(app);

app.listen(PORT, async () => {
  /* eslint-disable-next-line no-console */
  console.log('server on');

  await bootLog(PORT);
});

export default app;
