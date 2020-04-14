const api = require("../../our-app/src/api");
const express = require("express");
const router = express.Router();
const user_router = require("./user");
const login_router = require("./login");
const vaccination_router = require("./vaccination");
const demographic_router = require("./demographic");

router.use("/user", user_router);
router.use("/login", login_router);
router.use("/vaccination", vaccination_router);
router.use("/demographic", demographic_router);

module.exports = router;
