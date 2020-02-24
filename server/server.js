var express = require("express");

var app = express();

port = process.env.port | 3001;

app.listen(port, () => console.log(port));