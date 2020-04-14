const db = require("../db");
const express = require("express");
const bcrypt = require("bcrypt");
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
                console.log(err);
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
}

router.get("/:id", async (req, res, next) => {
    const user = await get_user(db.ObjectId(req.params.id));
    if (!user) { res.status(500).send(new Error("USER DNE")); }

    if (user.roles === "provider") {
        get_all_user(filter = { roles: { "$ne": "provider" } })
            .then(users => res.status(200).send(users))
            .catch(err => res.status(500).send(err));
    } else if (user.roles === "patient") {
        res.status(200).send(user);
    } else {
        res.status(500).send(new Error("Invalid User Role"));
    }
});

router.post("/", async (req, res, next) => {
    const u = req.body;
    const user = {
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        password: await bcrypt.hash(u.password, 10),
        dateOfBirth: new Date(u.dateOfBirth),
        roles: u.roles.toLowerCase(),
        demographic: "",
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
        password: await bcrypt.hash(u.password, 10),
        dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth) : new Date(),
        roles: u.roles ? u.roles.toLowerCase() : "patient",
        demographic: u.demographic ? u.demographic : "",
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
