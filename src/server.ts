import app from '@/app';
import config from '@configs/index';
import logger from '@middlewares/logger';

const server = app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started on Port ${config.PORT} 🚀`);
  logger.info(`Server Started on Port ${config.PORT} 🚀`);
});

server.on('error', (err: ETS.ServerError) => {
  if (err.code === 'EADDRINUSE') {
    // eslint-disable-next-line no-console
    console.log(`⚠️  localhost port ${config.PORT} already in use!!!`);
    logger.error(`⚠️  localhost port ${config.PORT} already in use!!!`);
  } else {
    logger.error(err);
    throw err;
  }
});

export default server;
