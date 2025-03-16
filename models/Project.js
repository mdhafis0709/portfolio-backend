const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);