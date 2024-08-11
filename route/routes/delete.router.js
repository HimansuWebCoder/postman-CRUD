const express = require('express');
const path = require('path');
const deleteUserRouter = express.Router();

// // Serve the delete user page
deleteUserRouter.get('/:id/delete', (req, res) => {
  res.sendFile(path.join(__dirname, '../delete-user.html'));
  console.log(req.params)
});


module.exports = deleteUserRouter;