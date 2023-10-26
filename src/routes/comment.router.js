const { getAll, create, getOne, remove, update } = require('../controllers/comment.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt');


const routerComment = express.Router();

routerComment.route('/')
    .get(getAll)
    .post(verifyJwt, create);

routerComment.route('/:id')
    .get(verifyJwt, getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerComment;