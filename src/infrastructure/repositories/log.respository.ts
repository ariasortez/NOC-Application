import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDataRepository } from '../../domain/repository/log.repository';

export class LogRepositoryImpl implements LogDataRepository {
  constructor(private readonly logDatasource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log);
  }
  async getLogs(severityLeveL: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLeveL);
  }
}
