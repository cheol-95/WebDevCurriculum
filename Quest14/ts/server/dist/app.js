"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./graphql/index"));
const config_1 = __importDefault(require("./config/config"));
const cors_1 = require("./lib/cors");
const { PORT, SSL } = config_1.default;
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(cors_1.cors);
app.get('/', (req, res) => {
    res.send('Hello');
});
index_1.default(app);
const httpServer = https_1.default.createServer(SSL, app);
httpServer.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log('server on');
});
