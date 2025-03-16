const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Fetch All Messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// Submit Contact Form
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    try {
      const newContact = new Contact({ name, email, message });
      await newContact.save();
      res.status(201).json({ message: 'Message sent successfully!' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Delete a Contact Message
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;