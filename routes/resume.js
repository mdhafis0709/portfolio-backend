const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// API to Get Resume Data
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) {
      return res.status(404).json({ message: 'No resume data found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume data:', error);
    res.status(500).json({ message: 'Error fetching resume data', error: error.message });
  }
});

// API to Add Resume Data (for initial setup)
router.post('/', async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    console.error('Error saving resume data:', error);
    res.status(500).json({ message: 'Error saving resume data', error: error.message });
  }
});

// API to Edit/Update Resume Data
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResume = await Resume.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(updatedResume);
  } catch (error) {
    console.error('Error updating resume data:', error);
    res.status(500).json({ message: 'Error updating resume data', error: error.message });
  }
});

// API to Delete Resume Data
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResume = await Resume.findByIdAndDelete(id);

    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume data:', error);
    res.status(500).json({ message: 'Error deleting resume data', error: error.message });
  }
});

module.exports = router;