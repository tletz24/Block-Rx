var db = require("../db");
var express = require("express");
var router = express.Router();

validate_login = async function (filter, check_password) {
    return new Promise((resolve, reject) => {
        try {
            db.users().findOne(filter, (err, data) => {
                if (err) {
                    // failed to read db
                    reject(err);
                } else if (data.password === check_password) {
                    resolve({
                        id: data._id,
                        dateOfBirth: data.dateOfBirth
                    });
                } else {
                    // failed password todo what do we want here
                    reject(new Error("Incorrect Password"));
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};

router.post("/", (req, res, next) => {
    validate_login({ email: req.body.email }, req.body.password)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

module.exports = router;