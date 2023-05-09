import { Express, Request, Response } from 'express';
import logger from '@middlewares/logger';

function notFoundHandler(_req: Request, res: Response) {
  logger.error(`End point ${_req.method} ${_req.url} not found`);
  res.status(404).json({ success: false, message: 'Request Not Found' });
}

function errorHandler(err: Error, _req: Request, res: Response) {
  logger.error('Server Error');
  logger.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}

function httpErrorHandlers(app: Express) {
  app.use(notFoundHandler);
  app.use(errorHandler);
}

export default httpErrorHandlers;
