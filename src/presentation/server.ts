import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.respository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
  constructor() {}

  public static start() {
    console.log('Server Started');

    const emailService = new EmailService();

    emailService.sendEmail({
      to: 'juanariasortez@gmail.com',
      subject: 'Testing',
      htmlBody: `
      
      <h3> Logs de Sistema NOC</h3>
      <p>
      
      Texto
      </p>
      <p>Ver logs adjuntos</p>
      
      `,
    });

    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemRepository,
    //     () => console.log('Success'),
    //     (error) => console.log(error)
    //   ).execute('http://localhost:3000');
    // });
  }
}
