import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { jwtVerify } from '../lib/auth.mjs';

import typeDefs from './typeDefs/index.mjs';
import resolvers from './resolvers/index.mjs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: async ({ req }) => {
    return { user: await jwtVerify(req) };
  },
  formatError: (err) => {
    // 에러 후속처리?
    throw err;
  },
});

await apolloServer.start();

export default apolloServer;
