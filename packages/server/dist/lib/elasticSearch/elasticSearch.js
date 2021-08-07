"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
const client = new elasticsearch_1.Client({
    node: 'https://search-test-es-7lc57mlvxyinnoy6xh6ghd56xy.ap-northeast-2.es.amazonaws.com/',
});
class ElasticSearch {
    constructor(indexName) {
        this.INDEX_NAME = indexName;
    }
    async requestElasticSearch(bodyData) {
        await client.index(bodyData);
    }
}
exports.default = ElasticSearch;
