const express = require("express");
const db = require("../db");
const router = express.Router();

const create_demographic = (obj) => {
	return { ...obj }; // for now assume we have no parsing or checks
};

router.get("/:user_id", async (req, res, next) => {
	const user = await db.users().findOne(db.ObjectId(req.params.user_id));

	if (user) {
		const id = user.demographic;

		if (!id) {
			res.status(404).json({ message: "Unknown Demographic " + id + " for User " + user._id });
		}

		db.demographics().findOne(db.ObjectId(id), (err, data) => {
			if (err) {
				res.status(500).json(err);
			} else if (data) {
				res.json(data);
			} else {
				res.status(404).json({ message: "Unknown Demographic " + req.params.id });
			}
		});
	} else {
		res.status(404).json({ message: "Unknown User " + user_id });
	}
});

router.put("/:user_id", async (req, res, next) => {
	const user = await db.users().findOne(db.ObjectId(req.params.user_id));

	// user not found
	if (!user) res.status(404).json({ message: "Unknown User " + req.params.user_id });

	// create new set of demographic information from req.body
	const insert_result = await db.demographics().insertOne(create_demographic(req.body));
	const demographic = insert_result.insertedId;

	if (!!demographic || demographic.toString().trim() !== "") {
		const r = await db.users().updateOne(db.ObjectId(user._id), { "$set": { "demographic": demographic } });

		if (r.matchedCount === r.modifiedCount) {
			res.status(200).json({ message: "Added Demographic " + demographic + " to User " + user._id });
		} else if (r.matchedCount === 1 && r.modifiedCount === 0) {
			res.status(304).json({ message: "User " + user._id + " already has Demographic " + demographic });
		} else {
			res.status(500).json();
		}
	} else {
		res.status(400).json({ message: "cannot create Demographic from request body" });
	}
});

router.post("/:user_id", async (req, res, next) => {
	const user = await db.users().findOne(db.ObjectId(req.params.user_id));

	if (!user) res.status(404).json({ message: "Unknown User " + req.params.user_id });

	if (!user.demographic || user.demographic.toString().trim() === "") res.status(404).json({ message: "Cannot edit unknown demographic history for User " + req.params.user_id });

	if (!req.body || req.body === {}) res.status(400).json({ message: "Cannot set fields given an empty object" });

	// uses $set to change values of fields specified in changed_fields ONLY
	const r = await db.demographics().updateOne({ _id: user.demographic }, { $set: req.body });

	if (!r) res.status(404).json({ message: "Unknown Demographic " + user.demographic + " for User " + user._id });

	if (r.matchedCount === r.modifiedCount) {
		res.status(200).json({ message: "Updated Demographic " + user.demographic + " for User " + user._id });
	} else if (r.matchedCount === 1 && r.modifiedCount === 0) {
		res.status(304).json({ message: "User " + user._id + " already has matching Demographic " + user.demographic });
	} else {
		res.status(500).json();
	}
});

module.exports = router;
