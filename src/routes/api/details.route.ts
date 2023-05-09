import { Router, Request, Response } from 'express';
import detailController from '@controllers/details.controller';
import logger from '@middlewares/logger';

const detailRouter = Router();

detailRouter.all('/', (req: Request, res: Response) => {
  if (req.method === 'GET') {
    try {
      detailController(req, res);
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal Server Error' });
      logger.error(error);
    }
  } else {
    res.status(405).send({ success: false, message: 'Method Not Allowed' });
  }
});

export default detailRouter;
