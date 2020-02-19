var express = require("express");
var router = express.Router();
var db = require("../../db/db");

function resolve(email) {
    return db.collection("users", "user").findOne({ email: email }, (err, data) => {
        if (err) {
            resolve(err);
        }

        resolve(data);
    });
};

router.get('/:email', async (req, res) => {

    let filter = { email: req.params.email };

    db.collection("users", "user").findOne(filter, (err, data) => {
        if (err) throw err;

        res.status(200).send(data);
    });
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
    res.status.send(req.body.user);
    //db.collection("users", "user").insertOne(req.body);
});

module.exports = router;