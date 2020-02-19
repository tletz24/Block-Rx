var express = require("express");
var router = express.Router();
var db = require("../../db/db");

router.post("/", (req, res) => {
    // not sure what the immunization record object will look like yet 

    // assume it gets added to the database here

    res.status(200).send({
        blockId: 69, // BLOCKCHAIN BLOCK ID
    });
})

module.exports = router;