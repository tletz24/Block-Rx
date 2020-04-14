const db = require("../db");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

validate_login = async function (filter, check_password) {
    return new Promise((resolve, reject) => {
        try {
            db.users().findOne(filter, async (err, data) => {
                if (err) {
                    // failed to read db
                    reject(JSON.parse('{"status":"500","message":"Mongo Error"}'));
                } else if (await bcrypt.compare(check_password, data.password)) {
                    resolve(JSON.parse('{"status":"200","message":{"id":"' + data._id + '","email":"' + data.email + '","firstName":"' + data.firstName + '","lastName":"' + data.lastName + '","dateOfBirth":"' + data.dateOfBirth + '","roles":"' + data.roles + '"}}'
                    ));
                } else {
                    resolve(JSON.parse('{"status":"401","message":"Incorrect Password"}'));
                }
            });
        } catch (err) {
            reject(JSON.parse('{"status":"500","message":"Caught ' + err.message + '"}'));
        }
    });
};

router.post("/", (req, res, next) => {
    validate_login({ email: req.body.email }, req.body.password)
        .then(data => res.status(data.status).send(data))
        .catch(err => res.status(500).send(err));
});

module.exports = router;
