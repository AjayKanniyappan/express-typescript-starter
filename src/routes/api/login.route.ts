import { Router, Request, Response } from 'express';
import loginController from '@controllers/login.controller';

const loginRouter = Router();

loginRouter.get('/', async (_req: Request, res: Response) => {
  res.status(200).send(await loginController());
});

export default loginRouter;
