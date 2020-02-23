var express = require("express");
var router = express.Router();
var db = require("../../db/db");

get_user = async function (filter) {
    return new Promise((resolve, reject) => {
        try {
            db.collection("users", "user").findOne(filter, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
}

router.get('/:email', async (req, res) => {
    let filter = { email: req.params.email };

    get_user(filter)
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send(err));




    // old method for returning a user on request
    // db.collection("users", "user").findOne(filter, (err, data) => {
    //     if (err) throw err;

    //     res.status(200).send(data);
    // });
});

router.post('/:email', async (req, res) => {
    let filter = { email: req.params.email };

    if (true) {
        // current user matches user with requested changes (req.params.email)
        db.collection("users", "user").updateOne(filter, (err, data) => {
            if (err) throw err;

            res.status(200).send("User updated successfully");
        });
    }
});

router.post("/", async (req, res) => {
    //db.collection("users", "user").insertOne(req.body);
    res.status.send(req.body.user);
});

module.exports = router;