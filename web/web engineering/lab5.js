const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage setup for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// POST route to handle form submission
app.post('/register', upload.single('photoId'), (req, res) => {
  const {
    name, email, password, phone, gender, province, dob, course
  } = req.body;

  const photoId = req.file;

  const studentData = {
    name,
    email,
    password,
    phone,
    gender,
    province,
    dob,
    course,
    photoId: photoId ? photoId.filename : null
  };

  console.log('Received registration:', studentData);

  // In production: save to a database

  res.json({ message: 'Registration successful', data: studentData });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
