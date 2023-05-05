import { Router } from 'express';
import loginRouter from './login.route';

const apiRouter = Router();

apiRouter.use('/login', loginRouter);

export default apiRouter;
