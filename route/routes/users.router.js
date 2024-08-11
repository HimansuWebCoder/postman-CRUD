const express = require('express');
const { getUsers, postUser, updateUser, deleteUser } = require('../controllers/users.controller');
const db = require('../models/db');
const usersRouter = express.Router();

usersRouter.get('/users', (req, res) => { getUsers(req, res, db)} );
usersRouter.post('/users', (req, res) => { postUser(req, res, db)} );
usersRouter.put('/user/:id', (req, res) => { updateUser(req, res, db)} );
usersRouter.delete('/user/:id', (req, res) => { deleteUser(req, res, db)} );


module.exports = usersRouter;