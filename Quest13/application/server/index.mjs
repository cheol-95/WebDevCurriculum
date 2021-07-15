import https from 'https';
import morgan from 'morgan';
import express from 'express';

import apolloServer from './graphql/index.mjs';
import config from './config/config.mjs';
import { cors } from './lib/cors.mjs';

const { PORT, SSL } = config;
const app = express();

app.use(morgan('dev'));
app.use(cors);

apolloServer.applyMiddleware({
  app,
  cors: {
    origin: config.CORS['Access-Control-Allow-Origin'],
  },
});

const httpServer = https.createServer(SSL, app);
httpServer.listen(PORT, () => {
  console.log('server on');
});
