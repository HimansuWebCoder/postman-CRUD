const express = require('express');
const path = require('path');
const multer  = require('multer');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

const usersImg = []

app.get('/', (req, res) => {
  res.json(usersImg)
});

// app.get('/profile', (req, res) => {
//   res.sendFile(path.join(__dirname,'index.html'));
// });

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // Log the file information
  console.log('Uploaded file:', req.file);
   
  // Log the text fields
  // console.log('Form fields:', req.body);
  const images = {
    image: `/uploads/${req.file.filename}`
  }
   usersImg.push(images);
});


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
