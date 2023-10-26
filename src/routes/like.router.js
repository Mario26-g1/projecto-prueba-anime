const { getAll, create, remove } = require('../controllers/like.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt');


const routerLike = express.Router();


routerLike.route('/')
    .get(getAll)

routerLike.route('/:animeId/like')
    .post(verifyJwt, create)


routerLike.route('/:animeId/unlike')
    .delete(verifyJwt, remove);


module.exports = routerLike;