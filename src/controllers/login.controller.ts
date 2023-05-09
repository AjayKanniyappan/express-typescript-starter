import { Model } from 'mongoose';
import { Response, Request } from 'express';
import userModal from '@models/userModel';
import { checkPassword } from '@libs/password';
import { generateToken } from '@libs/token';

/**
 * This code is an example purpose 👇
 * Change what as you need
 */
async function loginController(req: Request, res: Response) {
  const db = (await userModal('Database', 'users')) as Model<ETS.User>; // 👈 Change it to your DB
  /**
   * Request body 👇
   */
  const { email, password } = req.body;
  const user = await db?.findOne({ email });
  const valid = await checkPassword(password, user?.password as string); // 👈 Check password
  if (user && valid) {
    const authToken = generateToken(user?.email, '1d'); // 👈 Generate JWT auth token
    res.status(200).send({ success: true, message: 'Logged in successfully', token: authToken });
  } else {
    res.status(401).send({ success: false, message: 'Invalid email or password' });
  }
}

export default loginController;
