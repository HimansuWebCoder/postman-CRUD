const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Ensure the 'uploads' directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Set up multer to store files in 'uploads/' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Ensure the filename is unique by appending a timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve the static HTML file
app.use(express.static(__dirname));

// Handle POST request to '/profile' with single file upload
app.post('/profile', upload.single('avatar'), (req, res) => {
  // Log file and form data
  console.log('File:', req.file);
  console.log('Body:', req.body);

  // Respond with success message
  res.send('File uploaded successfully!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
