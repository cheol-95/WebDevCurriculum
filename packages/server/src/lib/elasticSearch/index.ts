import { ElasticSearchAPILog, ElasticSearchAPILogType } from './apiLog';

class LogService {
  constructor(private elasticSearchAPILog: ElasticSearchAPILog) {}

  public log(data: ElasticSearchAPILogType) {
    this.elasticSearchAPILog.putLog(data);
  }
}

export default new LogService(new ElasticSearchAPILog());
