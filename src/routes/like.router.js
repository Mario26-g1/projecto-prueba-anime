const { getAll, create, remove } = require('../controllers/like.controllers');
const express = require('express');

const routerLike = express.Router();


routerLike.route('/')
    .get(getAll)

routerLike.route('/:animeId/like')
    .post(create)


routerLike.route('/:animeId/unlike')
    .delete(remove);


module.exports = routerLike;