import { LogRepositoryImpl } from '../../../infrastructure/repositories/log.respository';
import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRespository: LogRepositoryImpl
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) {
        throw new Error('Email log was not sent');
      }
      const log = new LogEntity({
        message: `Log email sent`,
        level: LogSeverityLevel.high,
        origin: 'send-logs.ts',
      });

      this.logRespository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'send-logs.ts',
      });

      this.logRespository.saveLog(log);
      return false;
    }
  }
}
