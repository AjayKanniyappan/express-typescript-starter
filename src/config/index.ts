import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 5050,
};

export default config;
