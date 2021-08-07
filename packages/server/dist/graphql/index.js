"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const auth_1 = require("../lib/auth");
const config_1 = __importDefault(require("../config/config"));
const index_1 = require("../lib/elasticSearch/index");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const logging = (req) => {
    const { user, method, url, header, } = req;
    index_1.apiLog.log({
        userId: user ? user.id : undefined,
        method,
        url,
        header,
    });
};
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground],
    context: async ({ req }) => {
        req.user = await auth_1.jwtVerify(req);
        logging(req);
        return { user: req.user };
    },
    formatError: (err) => {
        throw err;
    },
});
exports.default = async (app) => {
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: config_1.default.CORS['Access-Control-Allow-Origin'],
        },
    });
};
