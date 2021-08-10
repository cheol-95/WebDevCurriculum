import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { jwtVerify } from '../lib/auth';
import config from '../config/config';
import { apiLog } from '../lib/elasticSearch/index';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const logging = (req: any) => {
  const {
    user, method, url, header,
  } = req;
  apiLog.log({
    userId: user ? user.id : undefined,
    method,
    url,
    header,
  });
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: async ({ req }: any) => {
    req.user = await jwtVerify(req);

    logging(req);
    return { user: req.user };
  },
  formatError: (err: any) => {
    throw err;
  },
});

export default async (app: Express) => {
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: config.CORS['Access-Control-Allow-Origin'],
    },
  });
};
