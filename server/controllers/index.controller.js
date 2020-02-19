var express = require("express");
var router = express.Router();

var user_c = require("./user.controller");
var imm_c = require("./imm.controller");

router.use("/user", user_c);
router.use("/imm", imm_c)

router.get("/", (req, res) => {
    res.status(200).send("OK");
});

module.exports = router;