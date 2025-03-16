const express = require('express');
const Hero = require('../models/Hero'); // Import the Hero schema
const router = express.Router();

// Fetch hero data
router.get('/', async (req, res) => {
  try {
    const heroData = await Hero.findOne(); // Fetch the first document
    res.json(heroData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hero data', error: err });
  }
});

// Update hero data
router.put('/', async (req, res) => {
    try {
      const { name, description, resumeLink } = req.body;
      const updatedHero = await Hero.findOneAndUpdate(
        {}, // Update the first document
        { name, description, resumeLink },
        { new: true, upsert: true } // Create if it doesn't exist
      );
      res.json(updatedHero);
    } catch (err) {
      res.status(500).json({ message: 'Error updating hero data', error: err });
    }
  });

module.exports = router;