/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import app from '@/app';
import config from '@config/index';

const server = app.listen(config.PORT, () => {
  console.log(`Server Started on Port ${config.PORT} 🚀`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  localhost port ${config.PORT} already in use!!!`);
  } else {
    console.log(err);
  }
});

export default server;
