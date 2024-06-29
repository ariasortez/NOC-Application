import { SendEmailLogs } from '../domain/use-cases/email/send-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.respository';
import { EmailService } from './email/email.service';

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource());
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

    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemRepository,
    //     () => console.log('Success'),
    //     (error) => console.log(error)
    //   ).execute('http://localhost:3000');
    // });
  }
}
