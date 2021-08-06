import { Client } from '@elastic/elasticsearch';

import { ElasticSearchAPILog, ElasticSearchAPILogType } from './apiLog';

const client = new Client({
  node: 'https://search-test-es-7lc57mlvxyinnoy6xh6ghd56xy.ap-northeast-2.es.amazonaws.com/',
});

class LogService {
  constructor(private elasticSearchAPILog: ElasticSearchAPILog) {}

  public log(data: ElasticSearchAPILogType) {
    this.elasticSearchAPILog.putLog(data);
  }
}

export const apiLog = new LogService(new ElasticSearchAPILog());

export const bootLog = async (PORT: number) => client.index({
  index: 'boot-logs',
  body: {
    message: `Server application is up and running on port ${PORT}`,
    timestamp: new Date(),
  },
});
