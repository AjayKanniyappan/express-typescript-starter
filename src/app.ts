import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.disable('x-powered-by');

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
