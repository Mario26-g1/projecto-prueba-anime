const { getAll, create, getOne, remove, update } = require('../controllers/new.controllers');
const express = require('express');

const routerNew = express.Router();

routerNew.route('/')
    .get(getAll)
    .post(create);

routerNew.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerNew;