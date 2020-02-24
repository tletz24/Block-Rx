var body_parser = require("body-parser");
var express = require("express");
var db = require("./db");
var router = require("./routes/index");

var app = express();
app.use(body_parser.json()); // for parsing application/json
app.use(body_parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// for testing only
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});

app.use("/", router);

port = process.env.port | 3001;

db.connect((err, db) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => console.log(port));
    }
});
