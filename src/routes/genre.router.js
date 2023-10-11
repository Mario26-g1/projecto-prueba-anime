const { getAll, Create, getOne, remove, update } = require('../controllers/genre.controllers');
const express = require('express');

const routerGenre = express.Router();

routerGenre.route('/')
    .get(getAll)
    .post(Create)

routerGenre.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update)

module.exports = routerGenre;