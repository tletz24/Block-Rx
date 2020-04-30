import { Router } from "express";
import User from '../model/user';

const router = Router();

router.post("/", async (req, res) => {
    try {
        User.findOne({ email: req.body.email }, '-demographic', function (err, user) {
            if (err) res.status(500).json(err);
            if (!user) res.status(404).json({ message: "User Not Found" });

            const ok = user.checkPassword(req.body.password);

            // do not return password property to client
            delete user.password;

            if (ok) res.status(200).json(user);
            else res.status(401).json({ message: "Incorrect Password" });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
