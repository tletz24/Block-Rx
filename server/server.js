import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import demographicRouter from './routes/demographic';
import loginRouter from './routes/login';
import userRouter from './routes/user';
import config from './config';
import proxy from 'express-http-proxy';

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use('/demographic', demographicRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/b', proxy('http://localhost:4000'));

mongoose.connect(config.db.connection_string, config.db.connection_options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async function () {
    const p = config.web.port;
    app.listen(p, () => console.log('config:', config.DEBUG ? config : p));
});
