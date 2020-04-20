const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');

const config = require('./config');

const app = express();

app.disable('x-powered-by');
app.use(body_parser.json()); // for parsing application/json
app.use(body_parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

/// link routers to respective routes at host/{routerFileName}
// cannot use this method with nested folders...yet
(() => {
    const rdir = __dirname + '/routes';
    try {
        fs.readdir(rdir, (_, files) => {
            for (const f of files) {
                const rfile = path.join(rdir, f);
                fs.stat(rfile, (_, stat) => {
                    if (stat.isFile()) {
                        const m = /routes/.exec(rfile);
                        if (m) app.use('/' + rfile.substring(m.index + 7, rfile.length - 3), require(rfile));
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
    }
})();

/// startup database connection and then start server

mongoose.connect(config.db.connection_string, config.db.connection_options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    const p = config.web.port;
    app.listen(p, () => console.log('config:', config.DEBUG ? config : p));
});