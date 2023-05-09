import { Model } from 'mongoose';
import { Response, Request } from 'express';
import userModal from '@models/userModel';
import { validateToken } from '@libs/token';

/**
 * This code is an example purpose 👇
 * Change what as you need
 */
async function detailController(req: Request, res: Response) {
  const db = (await userModal('Database', 'users')) as Model<ETS.User>; // 👈 Change it to your DB
  /**
   * Request header 👇
   */
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    const isValid = validateToken(bearerToken);
    const user = await db?.find();
    if (user && isValid) {
      res.status(200).send({ success: true, data: user });
    } else {
      res.status(401).send({ success: false, message: 'Unauthorized' });
    }
  } else {
    res.status(403).send({ success: false, message: 'Forbidden' });
  }
}

export default detailController;
