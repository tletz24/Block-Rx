var express = require("express");
var router = express.Router();
var db = require("../db");

let email_filter = { email: req.params.email };

router.get('/:email', (req, res) => {

    db.collection("users", "user").findOne(email_filter, (err, data) => {
        if (err) throw err;

        res.status(200).send(data);
    });
});

router.post('/:email', (req, res) => {
    if (true) {
        // current user matches user with requested changes (req.params.email)
        db.collection("users", "user").updateOne(email_filter, (err, data) => {
            if (err) throw err;

            res.status(200).send("User updated successfully");
        });
    }
});

module.exports = router;