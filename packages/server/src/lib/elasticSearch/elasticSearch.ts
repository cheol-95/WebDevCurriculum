// import { Client, RequestParams } from '@elastic/elasticsearch';

// const client = new Client({
//   node: 'https://search-test-es-7lc57mlvxyinnoy6xh6ghd56xy.ap-northeast-2.es.amazonaws.com/',
// });

// export default abstract class ElasticSearch<T> {
//   protected readonly INDEX_NAME: string;

//   constructor(indexName: string) {
//     this.INDEX_NAME = indexName;
//   }

//   protected async requestElasticSearch(bodyData: RequestParams.Index) {
//     await client.index(bodyData);
//   }

//   public abstract putLog(log: T): Promise<void>;
// }
