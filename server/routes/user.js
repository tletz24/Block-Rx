import { Router } from 'express';
import User, { findById, find, update } from '../model/user';
import Demographic from '../model/demographic';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password').exec();

        if (user.roles === 'patient') {
            res.status(200).json(user);
        } else if (user.roles === 'provider') {
            const users = await User.find({}).exec();
            res.json(users);
        } else {
            res.status(500).json({ message: "Unknown Roles " + user.roles });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const user = await (new User({
            demographic: await (new Demographic().save()),
            ...req.body
        }).save());

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    User.update({ _id: req.params.id }, req.body, function (err, k, raw) {
        if (err) res.status(500).json({ message: err.message });

        res.json({ updated: k.n === 1 });
    });
});

export default router;
