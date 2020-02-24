var express = require("express");
var router = express.Router();
var user_router = require("./user");

router.use("/user", user_router);

module.exports = router;