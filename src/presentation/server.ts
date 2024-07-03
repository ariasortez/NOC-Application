import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgreSqlDataSource } from '../infrastructure/datasources/postgre-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.respository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImpl(new PostgreSqlDataSource());
const emailService = new EmailService();
export class Server {
  constructor() {}

  public static start() {
    console.log('Server Started');

    // new SendEmailLogs(emailService, fileSystemRepository).execute([
    //   'juanariasortez@gmail.com',
    //   'juan.arias@unitec.edu',
    // ]);
    // emailService.sendEmailWithFileSystemLogs([
    //   'juanariasortez@gmail.com',
    //   'juan.arias@unitec.edu',
    // ]);

    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        logRepository,
        () => console.log('Success'),
        (error) => console.log(error)
      ).execute('http://google.com');
    });
  }
}
