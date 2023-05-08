import { Model } from 'mongoose';
import { Response, Request } from 'express';
import userModal from '@models/userModel';

async function loginController(req: Request, res: Response) {
  const db = (await userModal('Database', 'users')) as Model<unknown>;
  const user = await db?.findOne({ email: req.body.email });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(401).send({ success: false, message: 'Invalid email or password' });
  }
}

export default loginController;
