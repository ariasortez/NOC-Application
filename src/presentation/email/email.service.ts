import nodemailer from 'nodemailer';
import { LogRepositoryImpl } from '../../infrastructure/repositories/log.respository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email Sent',
        origin: 'email.service.ts',
      });

      console.log(sendInformation);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email Was Not Sent',
        origin: 'email.service.ts',
      });

      console.error(error);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del servidor';
    const htmlBody = `
      
      <h3> Logs de Sistema NOC</h3>
      <p>
      
      Texto
      </p>
      <p>Ver logs adjuntos</p>
      
      `;

    const attachments: Attachment[] = [
      {
        filename: 'logs-low.log',
        path: './logs/logs-low.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
