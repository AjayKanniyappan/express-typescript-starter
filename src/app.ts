import express, { Express, Request, Response, json, urlencoded } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import config from '@configs/index';
import compressFilter from '@utils/compressFilter';
import httpErrorHandlers from '@handlers/httpErrorHandlers';
import logger from '@middlewares/logger';

const app: Express = express();

/**
 * Body Parser
 */
app.use(json());
app.use(urlencoded({ extended: false }));

/**
 * Cookie Object Parser
 */
app.use(cookieParser());

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
 * Back End Logger
 * If You Don't want comment it
 */
app.use(
  morgan('combined', {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  }),
);

/**
 * Initial Route
 */
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

httpErrorHandlers(app); // 👈 Http Error Handlers

export default app;
