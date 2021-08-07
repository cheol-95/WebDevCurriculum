"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootLog = exports.apiLog = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const apiLog_1 = require("./apiLog");
const client = new elasticsearch_1.Client({
    node: 'https://search-test-es-7lc57mlvxyinnoy6xh6ghd56xy.ap-northeast-2.es.amazonaws.com/',
});
class LogService {
    constructor(elasticSearchAPILog) {
        this.elasticSearchAPILog = elasticSearchAPILog;
    }
    log(data) {
        this.elasticSearchAPILog.putLog(data);
    }
}
exports.apiLog = new LogService(new apiLog_1.ElasticSearchAPILog());
const bootLog = async (PORT) => client.index({
    index: 'boot-logs',
    body: {
        message: `Server application is up and running on port ${PORT}`,
        timestamp: new Date(),
    },
});
exports.bootLog = bootLog;
