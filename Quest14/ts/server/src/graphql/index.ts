import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { jwtVerify } from '../lib/auth';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: async ({ req }) => {
    return { user: await jwtVerify(req) };
  },
  formatError: (err: any) => {
    // 에러 후속처리?
    throw err;
  },
});

export default apolloServer;
