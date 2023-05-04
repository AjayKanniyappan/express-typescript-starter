import app from '@/app';
import config from '@configs/index';

const server = app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started on Port ${config.PORT} 🚀`);
});

server.on('error', (err: ETS.ServerError) => {
  if (err.code === 'EADDRINUSE') {
    // eslint-disable-next-line no-console
    console.log(`⚠️  localhost port ${config.PORT} already in use!!!`);
  } else {
    throw err;
  }
});

export default server;
