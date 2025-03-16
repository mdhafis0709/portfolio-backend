const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: 'Login successful', authenticated: true });
    } else {
      res.status(401).json({ message: 'Invalid username or password', authenticated: false });
    }
  } catch (error) {
    console.error('Error in /api/login:', error); // Log the full error
    res.status(500).json({ message: 'An error occurred. Please try again.', error: error.message });
  }
});

// Other Routes
app.use('/api/projects', require('./routes/project'));
app.use('/api/skills', require('./routes/skill'));
app.use('/api/about', require('./routes/about'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/resume', require('./routes/resume'));
app.use('/api/hero', require('./routes/hero'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));