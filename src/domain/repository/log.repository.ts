import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

//Nos va a permirir llamar al DATASOURCE
export abstract class LogDataRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLeveL: LogSeverityLevel): Promise<LogEntity[]>;
}
