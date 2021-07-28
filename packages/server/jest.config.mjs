export default {
  transform: {
    '^.+\\.ts$': 'ts-jest', // 트랜스포머 경로 설정
  },
  testRegex: '\\.test\\.ts$',
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
