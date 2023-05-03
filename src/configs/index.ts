import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  CORS_ORIGIN: process.env.CORS_ORIGIN as string,
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 5050,
};

export default config;
