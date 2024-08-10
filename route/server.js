const express = require('express');
const app = express();
let users = []; // In-memory array to store users

// Middleware to parse JSON bodies (for POST/PUT requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// API route to get all users (for user-list.html)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// API route to handle user creation (for adding new users)
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    skills: req.body.skills
  };
  users.push(newUser);
  res.json({ message: 'User added successfully', user: newUser });
});

// API route to handle user updates (for the edit page)
app.put('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedData = req.body;

  users = users.map(user => user.id === userId ? { ...user, ...updatedData } : user);

  res.json({ message: 'User updated successfully', userId });
});

// API route to handle user deletion (for the delete page)
app.delete('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  users = users.filter(user => user.id !== userId);

  res.json({ message: 'User deleted successfully', userId });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
