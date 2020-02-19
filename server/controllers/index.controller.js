var express = require("express");
var router = express.Router();

var user_c = require("./user.controller");

router.use('/user', user_c);

router.get('/', (req, res) => {
    res.status(200).send("OK");
});

module.exports = router;