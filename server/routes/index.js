const api = require("../../our-app/src/api");
const express = require("express");
const router = express.Router();
const user_router = require("./user");
const login_router = require("./login");

router.use("/user", user_router);
router.use("/login", login_router);

module.exports = router;