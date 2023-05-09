import { sign, verify } from 'jsonwebtoken';
import config from '@configs/index';
import logger from '@middlewares/logger';

function generateToken(email: string, expiresIn: string) {
  const token = sign({ email }, config.SECRET_KEY, { expiresIn });
  return token;
}

function validateToken(token: string) {
  try {
    const auth = verify(token, config.SECRET_KEY);
    return auth;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

export { generateToken, validateToken };
