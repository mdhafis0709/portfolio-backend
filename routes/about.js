const express = require('express');
const router = express.Router();
const About = require('../models/About');

// Get About Info
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About data not found' });
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update About Info
router.put('/', async (req, res) => {
  const { bio, image } = req.body;
  try {
    const updatedAbout = await About.findOneAndUpdate(
      {},
      { bio, image },
      { new: true, upsert: true }
    );
    res.json(updatedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;