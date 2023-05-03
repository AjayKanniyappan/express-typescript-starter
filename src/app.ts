import express, { Express, Request, Response, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from '@configs/index';
import compressFilter from '@utils/compressFilter';

const app: Express = express();

/**
 * Body Parser
 */
app.use(json());
app.use(urlencoded({ extended: false }));

/**
 * JSON Response Formatting
 */
app.set('json spaces', 2);

/**
 * CORS Middleware For Routes
 * Origin Is Given A Array If We Want To Have Multiple Origins Later
 */
app.use(
  cors({
    origin: [config.CORS_ORIGIN],
    credentials: true,
  }),
);

app.use(helmet()); // 👈 Helmet Is Used To Secure This App By Configuring The Http-Header
app.use(compression({ filter: compressFilter })); // 👈 Compression Is Used To Reduce The Size Of The Response Body
app.disable('x-powered-by');

/**
 * Initial Route
 */
app.get('/', (_req: Request, res: Response) => {
  res.send({ hi: 'hi' });
});

export default app;
