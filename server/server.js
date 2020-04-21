import { readdir, stat as _stat } from 'fs';
import { join } from 'path';
import express from 'express';
import { connect, connection } from 'mongoose';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import config, { db, web, DEBUG } from './config';
import blockchain from '../healthwallet-blockchain/healthwallet-rest-api/app';

const router = express.Router();
router.disable('x-powered-by');
router.use(json()); // for parsing application/json
router.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(cors());

/// link routers to respective routes at host/{routerFileName}
// cannot use this method with nested folders...yet
(() => {
    const rdir = __dirname + '/routes';
    try {
        readdir(rdir, (_, files) => {
            for (const f of files) {
                const rfile = join(rdir, f);
                _stat(rfile, (_, stat) => {
                    if (stat.isFile()) {
                        const m = /routes/.exec(rfile);
                        if (m) router.use('/' + rfile.substring(m.index + 7, rfile.length - 3), require(rfile));
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
    }
})();

/// startup database connection and then start server

connect(db.connection_string, db.connection_options);
const db = connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    const p = web.port;
    app.listen(p, () => console.log('config:', DEBUG ? config : p));
});

export default router;