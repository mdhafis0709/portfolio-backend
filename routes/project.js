const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get All Projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a New Project
router.post('/', async (req, res) => {
  const { title, description, image, link } = req.body;
  try {
    const newProject = new Project({ title, description, image, link });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a Project
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, image, link } = req.body;

  try {
    // Check if the project exists
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, image, link },
      { new: true } // Return the updated document
    );

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a Project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;