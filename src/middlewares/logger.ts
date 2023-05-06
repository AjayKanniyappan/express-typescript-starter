import { createLogger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import os from 'os';

function customFormat() {
  const findIP = Object.values(os.networkInterfaces()).flat();
  const ipAddress = findIP.find((i) => i?.family === 'IPv4' && !i?.internal)?.address ?? 'unknown';

  return format.combine(
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    format.printf((info) => {
      const logMessage = {
        level: info.level.toUpperCase(),
        label: 'Backend Logs',
        timestamp: info.timestamp,
        host: `User Name: ${os.hostname()}, IP Address: ${ipAddress}`,
        message: info.message,
      };
      return JSON.stringify(logMessage, null, 2);
    }),
  );
}

const logger = createLogger({
  level: 'info',
  format: customFormat(),
  transports: [
    new DailyRotateFile({
      filename: 'logs/status-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
    }),
    new DailyRotateFile({
      level: 'verbose',
      filename: 'logs/info-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
    }),
    new DailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      /* zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d', */ // 👈 If you want date and size limit enable it
    }),
    // new transports.Console(), // 👈 If You Need Logs In Console Enable It
  ],
});

export default logger;
