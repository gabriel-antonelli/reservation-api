import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import router from './router';
import { Logger } from '@/config';
import { morganMiddleware } from './middlewares';

const app = express();
const port = process.env.PORT;

app.use(morganMiddleware, express.json(), helmet(), router);

app.listen(port, () => Logger.info(`Started server at ${port}`));
