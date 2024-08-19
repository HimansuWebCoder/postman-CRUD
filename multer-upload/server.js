// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const app = express();
// const PORT = 3000;

// // Ensure the 'uploads' directory exists
// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }

// // Set up multer to store files in 'uploads/' directory
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     // Ensure the filename is unique by appending a timestamp
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Serve the static HTML file
// app.use(express.static(__dirname));

// // Handle POST request to '/profile' with single file upload
// app.post('/profile', upload.single('avatar'), (req, res) => {
//   // Log file and form data
//   console.log('File:', req.file);
//   console.log('Body:', req.body);

//   // Respond with success message
//   res.send('File uploaded successfully!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/upload', upload.single('image'), (req, res) => {
  const path = req.file.path;
  cloudinary.uploader.upload(path, { tags: 'basic_sample' }, function (err, image) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(image);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
