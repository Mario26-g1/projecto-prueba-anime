const { getAll, create, getOne, remove, update, login, logged } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt')
const upload = require('../utils/multer');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(upload.single('profilePicture'), create)

routerUser.route('/login')
    .post(login)



routerUser.route('/me')
    .get(verifyJwt, logged)



routerUser.route('/:id')
    .get(verifyJwt, getOne)
    .delete(verifyJwt, remove)
    .put(upload.single('profilePicture'), verifyJwt, update);



module.exports = routerUser;