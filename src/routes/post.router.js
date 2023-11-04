const { getAll, getOne, update } = require('../controllers/post.controllers');
const { create, remove } = require('../controllers/imageCloudinary.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt');
const upload = require('../utils/multer');


const routerPost = express.Router();

routerPost.route('/')
    .get(getAll)
    .post(upload.single('image'), verifyJwt, create)

routerPost.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerPost;