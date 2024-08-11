const express = require('express');
const path = require('path');
const editUserRouter = express.Router();

// // Serve the edit user page
editUserRouter.get('/:id/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '../edit-user.html'));
  console.log(req.params)
});


module.exports = editUserRouter;