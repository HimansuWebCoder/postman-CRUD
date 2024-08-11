// get all users
function getUsers(req, res, db) {
  res.json(db);
}

function postUser(req, res, db) {
  const { id, name, email, skills } = req.body;
  db.push({id: db.length, name: name, email: email, skills: skills});
  res.json(db);
}

// update user
function updateUser(req, res, db) {
  const userId = parseInt(req.params.id);
  const { name, email, skills } = req.body;

  // Check if userId is valid
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  // Find the user by ID and update their details
  const userIndex = db.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    // Update the user data
    db[userIndex] = { ...db[userIndex], name, email, skills };
    res.json({ message: 'User updated successfully', user: db[userIndex] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

// delete user
// function deleteUser(req, res, db) {
//   const userId = parseInt(req.params.id);

//   db = db.filter(user => user.id !== userId);

//   res.json({ message: 'User deleted successfully', userId });
// }

function deleteUser(req, res, db) {
  const userId = parseInt(req.params.id);

  // Find the index of the user to delete
  const index = db.findIndex(user => user.id === userId);

  if (index !== -1) {
    // Remove the user from the array using splice
    db.splice(index, 1);
    res.json({ message: 'User deleted successfully', userId });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}


module.exports = {
  getUsers,
  postUser,
  updateUser,
  deleteUser
}