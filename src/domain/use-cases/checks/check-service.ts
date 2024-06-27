import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogDataRepository } from '../../repository/log.repository';

interface ChekServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

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
      const log = new LogEntity(
        `Service ${url} is working`,
        LogSeverityLevel.low
      );
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity(errorMessage, LogSeverityLevel.low);
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}
