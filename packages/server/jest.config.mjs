export default {
  testRegex: '\\.test\\.js$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
    graphqlPath: '/graphql',
  },

  verbose: true,
  // testMatch: ['test/*.test.js'],
};
