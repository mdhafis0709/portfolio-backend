const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get All Skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a New Skill
router.post('/', async (req, res) => {
  const { name, proficiency, icon } = req.body;
  try {
    const newSkill = new Skill({ name, proficiency, icon });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a Skill
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, proficiency, icon } = req.body;

  try {
    // Check if the skill exists
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Update the skill
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { name, proficiency, icon },
      { new: true } // Return the updated document
    );

    res.json(updatedSkill);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a Skill
router.delete('/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;