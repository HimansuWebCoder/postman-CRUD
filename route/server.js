const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies (for POST/PUT requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const usersRouter = require('./routes/users.router');

const deleteUserRouter = require('./routes/delete.router');
const editUserRouter = require('./routes/edit.router');
const userListRouter = require('./routes/user-list.router');


app.get('/users', (req, res) => {
  res.sendFile(__dirname + '/user-list.html');
});

app.use('/api', usersRouter)

// Serve HTML files
app.use("/", userListRouter)
app.use("/user", deleteUserRouter)
app.use("/user", editUserRouter)

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
