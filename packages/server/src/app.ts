import morgan from 'morgan';
import express from 'express';

import apolloServer from './graphql/index';
import config from './config/config';
import cors from './lib/cors';
import stream from './lib/log';

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
});

export default app;
