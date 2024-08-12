// const express = require('express');
// const path = require('path');
// const multer  = require('multer');
// // const upload = multer({ dest: 'uploads/' });
// const app = express();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'index.html'));
// });

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // Log the file information
//   console.log('Uploaded file:', req.file);
  
//   // Log the text fields
//   console.log('Form fields:', req.body);

//   // Send a response
//   // res.send('File uploaded and form data received.');
//   res.send(`
// //     <h1>File Upload Successful</h1>
// //     <p>Uploaded file: ${req.file.originalname}</p>
// //     <img src="/uploads/${req.file.filename}" alt="Uploaded Image" style="max-width: 500px;">
// //   `);
// });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// directly server with name image in upload folder

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Preserve the original file name
  }
});

const upload = multer({ storage: storage });

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/profile', upload.single('avatar'), (req, res) => {
  // Log the file information
  console.log('Uploaded file:', req.file);
  
  // Send a response
  res.send(`
    <h1>File Upload Successful</h1>
    <p>Uploaded file: ${req.file.originalname}</p>
    <img src="/uploads/${req.file.originalname}" alt="Uploaded Image" style="max-width: 500px;">
  `);
});

// Serve static files (uploaded images)
app.use('/uploads', express.static(uploadDir));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




















// const express = require('express');
// const path = require('path');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// const app = express();

// // Serve index.html from the project root directory
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.post('/profile', upload.single('avatar'), (req, res) => {
//   // Log the file information
//   console.log('Uploaded file:', req.file);
  
//   // Send a response with the uploaded file information
//   res.send(`
//     <h1>File Upload Successful</h1>
//     <p>Uploaded file: ${req.file.originalname}</p>
//     <img src="/uploads/${req.file.filename}" alt="Uploaded Image" style="max-width: 500px;">
//   `);
// });

// // Serve static files from the 'uploads' directory

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
