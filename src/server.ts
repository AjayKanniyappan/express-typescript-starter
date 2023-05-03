/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import app from './app';

const server = app.listen(3000, () => console.log('Starting server on Port 3000'));

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port is already in use`);
  } else {
    console.log(err);
  }
});

export default server;
