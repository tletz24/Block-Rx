const db = require("../db");
const express = require("express");
const router = express.Router();

get_all_user = async function (filter = {}) {
    return new Promise((resolve, reject) => {
        try {
            resolve(db.users().find(filter)
                .project({ password: 0 }).toArray());
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

router.get("/", async (req, res, next) => {
    get_all_user()
        .then(users => {
            if (users.length > 0) {
                res.status(200).send(users);
            } else {
                res.status(500).send(new Error("EMPTY DB"));
            }
        })
        .catch(err => res.status(500).send(err));
});

router.get("/:id", async (req, res, next) => {
    get_user(db.ObjectId(req.params.id))
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
    const u = req.body;

    const user = {
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
    const u = req.body;

    const updated_user = {
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        password: u.password,
        dateOfBirth: new Date(u.dateOfBirth),
    };

    update_user(db.ObjectId(u.id), updated_user)
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
