import { Model } from 'mongoose';
import { Response, Request } from 'express';
import userModal from '@models/userModel';
import { hashPassword } from '@libs/password';
import logger from '@/middlewares/logger';

/**
 * This code is an example purpose 👇
 * Change what as you need
 */
async function registerController(req: Request, res: Response) {
  const db = (await userModal('Database', 'users')) as Model<unknown>; // 👈 Change it to your DB
  /**
   * Request body 👇
   */
  const { name, email, password } = req.body;
  const hashed = await hashPassword(password); // 👈 Hashing password
  const user = new db({
    name,
    email,
    password: hashed,
  });

  try {
    await user.save();
    res.status(201).send({ success: true, message: 'User Created' });
  } catch (error) {
    res.status(409).send({ success: false, message: 'Email Already Taken' });
    logger.error(error);
  }
}

export default registerController;
