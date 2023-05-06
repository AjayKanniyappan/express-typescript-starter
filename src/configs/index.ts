import * as dotenv from 'dotenv';
import coloredConsole from '@helpers/coloredConsole';
import logger from '@middlewares/logger';

/* eslint-disable no-console */
const result = dotenv.config();

/**
 * Stop server if the .env file is not found
 */
if (result.error) {
  console.log(
    `${coloredConsole('white', 'Unable to load')} ${coloredConsole(
      'red',
      'environment variables',
    )}`,
  );
  console.log(coloredConsole('red', `Server can't start without .env`));
  logger.error(`Server can't start without .env`);
  process.exit();
}

const config: ETS.Config = {
  CORS_ORIGIN: process.env.CORS_ORIGIN as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5050,
  SECRET_KEY: process.env.SECRET_KEY as string,
};

/**
 * Check that all required environment variables are present
 */
const requiredVariables = ['CORS_ORIGIN', 'DATABASE_URL', 'SECRET_KEY'];
for (const variable of requiredVariables) {
  if (!config[variable]) {
    console.log(
      `${coloredConsole('white', 'Missing environment variable:')} ${coloredConsole(
        'red',
        `${variable}`,
      )}`,
    );
    logger.error(`Please add .env ${variable} to start server`);
    process.exit();
  }
}

export default config;
