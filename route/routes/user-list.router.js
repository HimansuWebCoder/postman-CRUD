const express = require('express');
const path = require('path');
const userListRouter = express.Router();

// // Serve user list page
userListRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../user-list.html'));
  console.log(req.params)
});


module.exports = userListRouter;