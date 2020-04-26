import { Router } from "express";
import User from '../model/user';

const router = Router();

router.post("/", (req, res) => {
    User.findOne({ email: req.body.email }, '-demographic', function (err, user) {
        if (err) res.status(500).json(err);

        const ok = user.checkPassword(req.body.password);

        // do not return password property to client
        delete user.password;

        if (ok) res.status(200).json(user);
        else res.status(401).json({ message: "Incorrect Password" });
    });
});

export default router;
