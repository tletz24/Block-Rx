// private info
var password = require("../password");

// npm modules
var express = require("express");
var body_parser = require("body-parser");

// custom code
var db = require('./db');
var router = require("./controllers/index.controller");

// constants for server and db startup
const port = process.env.PORT | 3000;
const dbi = "mongodb+srv://cpu:" + password + "@cluster0-xs215.mongodb.net/test?retryWrites=true&w=majority";

// usings (linking together) 3rd party libs and backend routes to app
var app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/', router);

// startup for mongodb, triggers server startup on run
db.connect(dbi, (err, client) => {
    if (err) {
        console.log('Unable to connect to Mongo.');
        console.log(err);
        process.exit(1);
    } else {
        app.listen(port, function () {
            console.log(port);
        })
    }
});