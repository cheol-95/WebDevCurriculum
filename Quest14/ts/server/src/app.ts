import https from 'https';
import morgan from 'morgan';
import express from 'express';

import apolloServer from './graphql/index';
import config from './config/config';
import { cors } from './lib/cors';

const { PORT, SSL } = config;
const app = express();

app.use(morgan('dev'));
app.use(cors);

app.get('/', (req, res) => {
  res.send('Hello');
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: config.CORS['Access-Control-Allow-Origin'],
    },
  });
});

const httpServer = https.createServer(SSL, app);
httpServer.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log('server on');
});
