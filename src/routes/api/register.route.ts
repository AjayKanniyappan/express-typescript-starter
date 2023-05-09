import { Router, Request, Response } from 'express';
import registerController from '@controllers/register.controller';
import logger from '@middlewares/logger';

const registerRouter = Router();

registerRouter.all('/', (req: Request, res: Response) => {
  if (req.method === 'POST') {
    try {
      registerController(req, res);
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal Server Error' });
      logger.error(error);
    }
  } else {
    res.status(405).send({ success: false, message: 'Method Not Allowed' });
  }
});

export default registerRouter;
