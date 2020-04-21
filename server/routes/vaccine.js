import { Router } from 'express';
import Vaccine from '../model/vaccine';
const router = Router();

router.get('/:test', async (req, res) => {
  res.status(200).json({ ...req.params });
});

router.post('/', async (req, res) => {
  res.status(200).json({ ...req.body });
});

export default router;
