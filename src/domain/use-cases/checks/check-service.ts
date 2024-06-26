import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogDataRepository } from '../../repository/log.repository';

interface ChekServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckService implements ChekServiceUseCase {
  constructor(
    private readonly logRepository: LogDataRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`);
      }
      const log = new LogEntity({
        message: `Service ${url} is working`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts',
      });
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts',
      });
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
