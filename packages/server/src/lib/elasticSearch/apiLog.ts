import { RequestParams } from '@elastic/elasticsearch';
import ElasticSearch from './elasticSearch';

const INDEX_NAME = 'server_api_logs';

export type ElasticSearchAPILogType = {
  userId: any;
  url: string;
  method: string;
  header: Object;
};

export class ElasticSearchAPILog extends ElasticSearch<ElasticSearchAPILogType> {
  constructor() {
    super(INDEX_NAME);
  }

  public async putLog(log: ElasticSearchAPILogType): Promise<void> {
    try {
      const bodyData: RequestParams.Index = {
        index: this.INDEX_NAME,
        body: {
          ...log,
          timestamp: new Date(),
        },
      };

      await this.requestElasticSearch(bodyData);
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.log(err);
      throw err;
    }
  }
}
