import { readdir, stat as _stat } from 'fs';
import { join } from 'path';
import express from 'express';
import { connect, connection } from 'mongoose';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import demographicRouter from './routes/demographic';
import loginRouter from './routes/login';
import userRouter from './routes/user';
import immunizationRouter from './routes/immunization';
import config from './config';

import config, { db, web, DEBUG } from './config';
import blockchain from '../healthwallet-blockchain/healthwallet-rest-api/app';

const router = express.Router();
router.disable('x-powered-by');
router.use(json()); // for parsing application/json
router.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(cors());

app.use('/demographic', demographicRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/immunization', immunizationRouter);

/// startup database connection and then start server

connect(db.connection_string, db.connection_options);
const db = connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    const p = web.port;
    app.listen(p, () => console.log('config:', DEBUG ? config : p));
});

export default router;