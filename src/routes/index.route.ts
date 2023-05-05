import { Router, Request, Response } from 'express';
import path from 'path';
import apiRouter from './api';

const router = Router();

/**
 * Initial Route
 */
router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.use('/api', apiRouter); // 👈 api folder routes

export default router;
