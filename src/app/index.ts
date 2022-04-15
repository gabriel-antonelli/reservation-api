import express from 'express';
import 'dotenv/config';
import router from '../adapter/input/router';
import { Logger, morganMiddleware } from '../config';

const app = express();
const port = process.env.PORT;

app.use(morganMiddleware, router);

app.listen(port, () => Logger.info(`Started server at ${port}`));
