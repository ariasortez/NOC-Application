import { CronService } from './cron/cron-service';

export class Server {
  constructor() {}

  public static start() {
    console.log('Server Started');

    CronService.createJob('*/5 * * * * *', () => {
      const date = new Date();
      console.log('5 seconds', date);
    });
  }
}
