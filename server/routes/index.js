var api = require("../../our-app/src/api");
var express = require("express");
var router = express.Router();
var user_router = require("./user");
var login_router = require("./login");

router.use("/user", user_router);
router.use("/login", login_router);

router.get("/test", (req, res, next) => {
    let email = req.query['email'];

    api.get("/user", { email })
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

module.exports = router;