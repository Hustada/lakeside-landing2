type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const logger = {
  log: (level: LogLevel, message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const logMessage = {
      timestamp,
      level,
      message,
      ...(data && { data }),
    };

    switch (level) {
      case 'error':
        console.error(JSON.stringify(logMessage, null, 2));
        break;
      case 'warn':
        console.warn(JSON.stringify(logMessage, null, 2));
        break;
      case 'debug':
        console.debug(JSON.stringify(logMessage, null, 2));
        break;
      default:
        console.log(JSON.stringify(logMessage, null, 2));
    }
  },

  info: (message: string, data?: any) => logger.log('info', message, data),
  warn: (message: string, data?: any) => logger.log('warn', message, data),
  error: (message: string, data?: any) => logger.log('error', message, data),
  debug: (message: string, data?: any) => logger.log('debug', message, data),
};

export default logger;
