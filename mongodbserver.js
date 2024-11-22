const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection string (replace with your actual credentials)
const mongoURI = 'mongodb+srv://pandeyharsh190902:Satwikpandey%4003@cluster0.vmrwa.mongodb.net/faculty_management?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define Faculty Schema
const FacultySchema = new mongoose.Schema({
  name: String,
  age: Number,
  subject: String,
  department: String
});

// Faculty model
const Faculty = mongoose.model('Faculty', FacultySchema);

// GET - Fetch all faculty members
app.get('/faculties', async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching faculty data' });
  }
});

// POST - Add a new faculty member
app.post('/faculties', async (req, res) => {
  const { name, age, subject, department } = req.body;

  const newFaculty = new Faculty({
    name,
    age,
    subject,
    department,
  });

  try {
    await newFaculty.save();
    res.json({ message: 'Faculty member added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding faculty member' });
  }
});

// Server listening
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
