const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies (for POST/PUT requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const usersRouter = require('./routes/users.router');
// const deleteUserRouter = require('./routes/delete.router');


// Serve the user list page
app.get('/users', (req, res) => {
  res.sendFile(__dirname + '/user-list.html');
});

// Serve the edit page for a specific user
app.get('/user/:id/edit', (req, res) => {
  res.sendFile(__dirname + '/edit-user.html');
});

// Serve the delete page for a specific user
app.get('/user/:id/delete', (req, res) => {
  res.sendFile(__dirname + '/delete-user.html');
});



app.use('/api', usersRouter)
// app.use("/delete-user", deleteUserRouter)

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
