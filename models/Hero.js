const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  resumeLink: { type: String, required: true },
});

module.exports = mongoose.model('Hero', heroSchema);