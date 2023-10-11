const { getAll, create, getOne, remove, update } = require('../controllers/comment.controllers');
const express = require('express');

const routerComment = express.Router();

routerComment.route('/')
    .get(getAll)
    .post(create);

routerComment.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerComment;