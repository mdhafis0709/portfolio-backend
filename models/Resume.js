const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  experience: [
    {
      title: String,
      company: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  education: [
    {
      degree: String,
      institution: String,
      startYear: String,
      endYear: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model('Resume', resumeSchema);