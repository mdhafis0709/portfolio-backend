const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true },
  icon: { type: String, required: true }
});

module.exports = mongoose.model('Skill', SkillSchema);