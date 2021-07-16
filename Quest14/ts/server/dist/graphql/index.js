"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const auth_1 = require("../lib/auth");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground],
    context: async ({ req }) => {
        return { user: await auth_1.jwtVerify(req) };
    },
    formatError: (err) => {
        // 에러 후속처리?
        throw err;
    },
});
exports.default = apolloServer;
