const { getAll, create, getOne, remove, update } = require('../controllers/review.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt');

const routerReview = express.Router();

routerReview.route('/')
    .get(getAll)
    .post(verifyJwt, create);

routerReview.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerReview;