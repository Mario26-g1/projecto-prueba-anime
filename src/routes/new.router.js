const { getAll, create, getOne, remove, update } = require('../controllers/new.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt');


const routerNew = express.Router();

routerNew.route('/')
    .get(getAll)
    .post(verifyJwt, create);

routerNew.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerNew;