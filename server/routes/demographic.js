const express = require("express");
const db = require("../db");
const router = express.Router();

const create_demographic = (obj) => {
				// todo
				// parse demographic from object
				// expect that this object will be
				// the request body on post
				return {
								gender: "attack helicopter"
				};
};

router.get("/:user_id", async (req, res, next) => {
				const user = await db.users().findOne(db.ObjectId(req.params.user_id));

				if (user) {
								const id = user.demographic;

								if (!id) {
												res.status(404).json({message:"No known Demographic Id " + id + " for user " + user._id});
								}

				db.demographics().findOne(db.ObjectId(id), (err, data) => {
								if (err) {
												res.status(500).json(err);
								} else if (data) {
												res.json(data);
								} else {
												res.status(404).json({message:"Unknown Demographic Id: " + req.params.id});
								}
				});
				} else {
								res.status(404).json({message:"Unknown User Id: " + user_id});
				}
});

router.post("/:user_id", async (req, res, next) => {
				const user = await db.users().findOne(db.ObjectId(req.params.user_id));

				// user not found
				if (!user) res.status(404).json({message:"Unknown User Id " + req.params.user_id});

				// demographic information already created
				if (user.demographic && user.demographic != "") res.status(403).json({message:"User already has demographic information, use PUT to edit existing information"});

				// create new set of demographic information from req.body
				const insert_result = await db.demographics().insertOne(create_demographic(req.body));
				const demographic = insert_result.insertedId;

				if (demographic) {
					const r = await db.users().updateOne(db.ObjectId(user._id), {"$set":{demographic}});
	
					if (r.matchedCount === r.modifiedCount) {
									res.status(200).json({message:"Added demographic " + demographic + " to User " + user._id});
					} else if (r.matchedCount === 1 && r.modifiedCount === 0) {
									res.status(400).json({message:"User " + user._id + " already has demographic " + demographic});
					} else {
									res.status(500).json();
					}
				} else {
								res.status(400).json({message:"cannot create demographic from request body"});
				}
});

// todo implement this
router.put("/:demographic_id", (req, res, next) => {
				// parse demographic, unchanged fields should be undefined
				// or null and then copy the changed fields to an object
				const demographic = create_demographic(req.body);
				const changed_fields = {};
				
				for (var prop in demographic) {
				    if (Object.prototype.hasOwnProperty.call(demographic, prop)) {
								if (demographic[prop]) {
												changed_fields[prop] = demographic[prop]
								}
				    }
				}

				// uses $set to change values of fields specified in changed_fields ONLY
				db.demographics().updateOne({_id:db.ObjectId(demographic_id)}, demographic, { $set: changed_fields});
});

module.exports = router;
