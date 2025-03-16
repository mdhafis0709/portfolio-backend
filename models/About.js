const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('About', AboutSchema);