var db = require("../db");
var express = require("express");
var router = express.Router();

get_all_user = async function (filter = {}) {
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
            db.users().updateMany(filter, { $set: user }, { upsert: true }, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else resolve(data);
            })
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

router.get("/:id", async (req, res, next) => {
    get_user(db.filter(req.params.id))
        .then(u => {
            if (!!u) {
                res.status(200).send({
                    id: u._id,
                    email: u.email,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    dateOfBirth: u.dateOfBirth
                });
            } else {
                res.status(500).send(new Error("User DNE"));
            }
        })
        .catch(err => res.status(500).send(err));
});

router.post("/", async (req, res, next) => {
    let u = req.body;

    let user = {
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        password: u.password,
        dateOfBirth: new Date(u.dateOfBirth),
    };

    create_user(user)
        .then(data => res.status(200).send({ id: data.ops[0]._id }))
        .catch(err => res.status(500).send(err));
});

router.post("/update", async (req, res, next) => {
    let u = req.body;

    let updated_user = {
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        password: u.password,
        dateOfBirth: u.dateOfBirth,
    };

    update_user(db.filter(u.id), updated_user)
        .then(data => {
            const update_info = {
                matchedCount: data.matchedCount,
                modifiedCount: data.modifiedCount,
                upsertedCount: data.upsertedCount,
                upsertedId: data.upsertedId
            };

            res.status(200).send(update_info);
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router;