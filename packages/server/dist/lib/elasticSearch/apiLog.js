"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticSearchAPILog = void 0;
const elasticSearch_1 = __importDefault(require("./elasticSearch"));
const INDEX_NAME = 'server_api_logs';
class ElasticSearchAPILog extends elasticSearch_1.default {
    constructor() {
        super(INDEX_NAME);
    }
    async putLog(log) {
        try {
            const bodyData = {
                index: this.INDEX_NAME,
                body: {
                    ...log,
                    timestamp: new Date(),
                },
            };
            await this.requestElasticSearch(bodyData);
        }
        catch (err) {
            /* eslint-disable-next-line no-console */
            console.log(err);
            throw err;
        }
    }
}
exports.ElasticSearchAPILog = ElasticSearchAPILog;
