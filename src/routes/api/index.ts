import { Router } from 'express';
import loginRouter from './login.route';
import registerRouter from './register.route';
import detailRouter from './details.route';

const apiRouter = Router();

apiRouter.use('/login', loginRouter);
apiRouter.use('/register', registerRouter);
apiRouter.use('/details', detailRouter);

export default apiRouter;
