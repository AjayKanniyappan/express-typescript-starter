import { createLogger, format, transports } from 'winston';
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
    new transports.File({ filename: 'logs/status.log' }),
    new transports.File({ level: 'error', filename: 'logs/error.log' }),
    // new transports.Console(), // 👈 If You Need Logs In Console Enable It
  ],
});

export default logger;
