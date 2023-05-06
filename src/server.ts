import mongoose from 'mongoose';
import app from '@/app';
import config from '@configs/index';
import coloredConsole from '@helpers/coloredConsole';
import logger from '@middlewares/logger';

/* eslint-disable no-console */
const server = app.listen(config.PORT, () => {
  console.log(
    `${coloredConsole('white', 'Server Started on Port')} ${coloredConsole(
      'green',
      `${config.PORT} 🚀`,
    )}`,
  );
  console.log(
    `${coloredConsole('green', 'Checkout: 👉')} ${coloredConsole(
      'white',
      `http://localhost:${config.PORT}`,
    )}`,
  );
  logger.info(`Server Started on Port ${config.PORT} 🚀`);
});

server.on('close', () => {
  console.log(coloredConsole('red', 'Server Stopped'));
  logger.error('Server Stopped');
  if (mongoose.connection.readyState == 1) {
    mongoose.disconnect();
    logger.error('Database disconnected');
  }
});

server.on('error', (err: ETS.ServerError) => {
  if (err.code === 'EADDRINUSE') {
    console.log(
      `${coloredConsole('white', '⚠️  Localhost Port')} ${coloredConsole(
        'red',
        `${config.PORT}`,
      )} ${coloredConsole('white', 'Already in use!!!')}`,
    );
    logger.error(`⚠️  Localhost Port ${config.PORT} Already in use!!!`);
  } else {
    logger.error(err);
    throw err;
  }
});

export default server;
