const express = require('express');
const Vaccine = require('../model/vaccine');
const router = express.Router();

router.get('/:test', async (req, res) => {
  res.status(200).json({...req.params});
});

router.post('/', async (req, res) => {
  res.status(200).json({...req.body});
});

module.exports = router;
