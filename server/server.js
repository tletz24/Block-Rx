import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import demographicRouter from './routes/demographic';
import loginRouter from './routes/login';
import userRouter from './routes/user';
import config from './config';
import axios from 'axios';

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use('/demographic', demographicRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
// blockchain routes are found at host:port/b/path
app.use('/b', async (req, res, next) => {
  const opts = {
    method: req.method,
    url: req.path,
    proxy: {
      url: '0.0.0.0',
      port: 4000
    }
  };

  if (req.method === 'GET' && req.params[0]) {
    opts.params = req.params;
  } else if (req.method === 'POST' || req.method === 'PUT') {
    opts.data = req.body;
  }

  axios(opts)
    .then(rres => res.status(rres.status).json(rres.data))
    .catch(err => res.status(err.status).json({message:err.statusText}));
});
/// startup database connection and then start server

mongoose.connect(config.db.connection_string, config.db.connection_options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async function () {
    const p = config.web.port;
    app.listen(p, () => console.log('config:', config.DEBUG ? config : p));
});
