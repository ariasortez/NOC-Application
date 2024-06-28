import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.respository';
import { CronService } from './cron/cron-service';

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
  constructor() {}

  public static start() {
    console.log('Server Started');

    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        fileSystemRepository,
        () => console.log('Success'),
        (error) => console.log(error)
      ).execute('http://localhost:3000');
    });
  }
}
