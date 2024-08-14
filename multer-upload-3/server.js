const express = require('express');
const path = require('path');
const multer  = require('multer');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'test',
    database: 'uploadimg',
  },
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const usersImg = []

app.get('/', (req, res) => {
  // res.json(usersImg)
  db.select('*').from('images')
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });

}); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/upload-file', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/view-photo', (req, res) => {
  res.sendFile(path.join(__dirname,'image.html'));
}); 


app.post('/submit-file', upload.single('avatar'), function (req, res, next) {
  // Log the file information
  console.log('Uploaded file:', req.file);
  console.log('Uploaded file:', req.file.originalname);
   
  // Log the text fields
  // console.log('Form fields:', req.body);
  const images = {
    image: `/uploads/${req.file.filename}`
  }
   // usersImg.push(images);

  // db('images')
  // .returning('*')
  // .insert(images)



  // db('images')
  // .returning('*')
  // .insert(images)
  // .then(response => {
  //   res.json(response)
  //   console.log(response);
  // })
  // next();
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
