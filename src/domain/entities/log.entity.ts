export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt?: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    this.message = options.message;
    this.level = options.level;
    this.createdAt = new Date();
    this.origin = options.origin;
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    log.createdAt = new Date(createdAt);
    return log;
  };

  static fromOject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    return log;
  };
}
