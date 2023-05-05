import express, { Express, json, urlencoded } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compressFilter from '@utils/compressFilter';
import config from '@configs/index';
import httpErrorHandlers from '@handlers/httpErrorHandlers';
import logger from '@middlewares/logger';
import router from '@routes/index.route';

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

app.use(router); // 👈 Routes Handlers

httpErrorHandlers(app); // 👈 Http Error Handlers

export default app;
