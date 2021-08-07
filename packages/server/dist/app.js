"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const index_1 = require("./lib/elasticSearch/index");
const index_2 = __importDefault(require("./graphql/index"));
const config_1 = __importDefault(require("./config/config"));
const cors_1 = __importDefault(require("./lib/cors"));
const log_1 = __importDefault(require("./lib/log"));
// Elasticsearch
const { PORT } = config_1.default;
const app = express_1.default();
app.use(morgan_1.default('customFormat', { stream: log_1.default }));
app.use(cors_1.default);
app.get('/', (req, res) => {
    res.send('Hello');
});
index_2.default(app);
app.listen(PORT, async () => {
    /* eslint-disable-next-line no-console */
    console.log('server on');
    await index_1.bootLog(PORT);
});
exports.default = app;
