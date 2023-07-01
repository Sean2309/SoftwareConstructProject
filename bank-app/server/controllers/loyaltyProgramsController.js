const express = require('express');
const router = express.Router();
const LoyaltyPrograms = require('../models/loyaltyPrograms');

router.get('/', async (req, res) => {
  try{
    const loyaltyPrograms = await LoyaltyPrograms.find();
    res.json({loyaltyPrograms});
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
});

module.exports = router;


