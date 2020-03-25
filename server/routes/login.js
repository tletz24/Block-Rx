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
                    reject(err);
                } else if (await bcrypt.compare(check_password, data.password)) {
                    resolve({
                        id: data._id,
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        dateOfBirth: data.dateOfBirth,
			                  roles: data.roles
                    });
                } else {
                    reject(new Error("Invalid Login"));
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
