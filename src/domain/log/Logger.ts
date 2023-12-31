import * as Console from '@rnx-kit/console';

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

export class ConsoleLogger implements Logger {
  private readonly classname: string;

  constructor(classname: string) {
    this.classname = classname;
  }

  info(message: string): void {
    if (__DEV__) {
      const details = this.getLogDetails();
      Console.info(`${details}: ${message}`);
    }
  }

  warn(message: string): void {
    if (__DEV__) {
      const details = this.getLogDetails();
      Console.warn(`${details}: ${message}`);
    }
  }

  error(message: string): void {
    if (__DEV__) {
      const details = this.getLogDetails();
      Console.error(`${details}: ${message}`);
    }
  }

  private getLogDetails(): string {
    const now = new Date();
    return `${now} [${this.classname}]`;
  }
}
