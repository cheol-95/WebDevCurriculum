import morgan from 'morgan';
import express from 'express';

import apolloServer from './graphql/index';
import config from './config/config';
import cors from './lib/cors';

const { PORT } = config;
const app = express();

app.use(morgan('dev'));
app.use(cors);

app.get('/', (req, res) => {
  res.send('Hello');
});

apolloServer(app);

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log('server on');
});

export default app;
