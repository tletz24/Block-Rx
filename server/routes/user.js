var db = require("../db");
var express = require("express");
var router = express.Router();

/**
 * GET  /?email={email} => user{}
 * POST / body={info_user} => new_user{}
 * PUT  / body={update_user} => updated_user{}
 */

get_all_user = async function (filter) {
    filter = !!filter ? filter : {};

    return new Promise((resolve, reject) => {
        try {
            db.users().findMany(filter, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    });
};

get_user = async function (filter) {
    return new Promise((resolve, reject) => {
        try {
            db.users().findOne(filter, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
};

create_user = async function (user) {
    return new Promise((resolve, reject) => {
        try {
            db.users().insertOne(user, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
};

update_user = async function (filter, user) {
    return new Promise((resolve, reject) => {
        try {
            db.users().updateOne(filter, user, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
}

router.get("/", async (req, res, next) => {
    let filter = { email: req.query['email'] };

    get_user(filter)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

router.post("/", async (req, res, next) => {
    let u = req.body;

    let user = {
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        password: u.password,
        dateOfBirth: u.dateOfBirth,
    };

    create_user(user)
        .then(data => res.status(200).send(data.ops[0]))
        .catch(err => res.status(500).send(err));
});

router.put("/", async (req, res, next) => {
    let u = req.body;
    let filter = { email: u.email };

    let user = {
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        password: u.password,
        dateOfBirth: u.dateOfBirth,
    };

    get_user(filter)
        .then(data => {
            // need to create a filter on unique _id so we can edit email string if nesc.
            let filter_ = { _id: data._id };

            update_user(filter, user)
                .then(data => res.status(200).send(data))
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router;