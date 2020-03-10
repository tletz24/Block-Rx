var api = require("../../our-app/src/api");
var express = require("express");
var router = express.Router();
var user_router = require("./user");
var login_router = require("./login");

router.use("/user", user_router);
router.use("/login", login_router);

module.exports = router;