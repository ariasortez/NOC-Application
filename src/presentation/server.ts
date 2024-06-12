import { error } from 'console';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class Server {
  constructor() {}

  public static start() {
    console.log('Server Started');

    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        () => console.log('Success'),
        (error) => console.log(error)
      ).execute('http://localhost:3000');
    });
  }
}
