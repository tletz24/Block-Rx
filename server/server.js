const body_parser = require("body-parser");
const express = require("express");
const db = require("./db");
const router = require("./routes/index");
const auth = require("./middleware/auth").auth;
const cors = require("cors");
const app = express();

app.disable("x-powered-by");
app.use(body_parser.json()); // for parsing application/json
app.use(body_parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(auth(_ => true));

// for testing only
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});

app.use("/", router);

port = process.env.port | 3001;

const db_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

db.connect(db_options, (err, db) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => console.log(port));
    }
});
