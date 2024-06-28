import fs from 'fs';

import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-low.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) {
          return;
        }
        fs.writeFileSync(path, '');
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logJSON = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath, logJSON);
    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logJSON);
    }

    if (newLog.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, logJSON);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    const stringLogs = content
      .split('\n')
      .map((log) => LogEntity.fromJson(log));

    return stringLogs;
  };
  async getLogs(severityLeveL: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLeveL) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLeveL} does not exists`);
    }
  }
}
