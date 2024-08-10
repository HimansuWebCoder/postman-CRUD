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
  const { id, name, email, skills } = req.body;
  users.push({id: users.length, name: name, email: email, skills: skills});
  res.json(users);
});

// API route to handle user updates (for the edit page)
app.put('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, skills } = req.body;

  // Check if userId is valid
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  // Find the user by ID and update their details
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    // Update the user data
    users[userIndex] = { ...users[userIndex], name, email, skills };
    res.json({ message: 'User updated successfully', user: users[userIndex] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
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
