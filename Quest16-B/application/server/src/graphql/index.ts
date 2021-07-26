import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { jwtVerify } from '../lib/auth';
import config from '../config/config';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: async ({ req }) => ({ user: await jwtVerify(req) }),
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
