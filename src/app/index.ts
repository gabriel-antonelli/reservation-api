import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import setupRouter from './router';
import { Logger } from '@/config';
import { morganMiddleware } from './middlewares';

const app = express();
const port = process.env.PORT;

app.use(morganMiddleware, express.json(), helmet());
setupRouter(app);

app.listen(port, () => Logger.info(`Started server at ${port}`));
