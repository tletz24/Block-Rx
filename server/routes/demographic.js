import { Router } from "express";
import { findById } from "../model/user";
import { updateOne } from "../model/demographic";
const router = Router();

router.get("/:uid", async (req, res) => {
	try {
		const demographic = (await findById(req.params.uid).exec()).getDemographic();

		res.json(demographic);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/:uid", async (req, res) => {
	try {
		const user = await findById(req.params.uid).exec();
		const rep = await updateOne({ _id: user.demographic }, req.body).exec();

		res.json({ modified: rep.nModified === 1 });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;
