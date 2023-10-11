const { getAll, create, getOne, remove, update } = require('../controllers/anime.controllers');
const express = require('express');

const routerAnime = express.Router();

routerAnime.route('/')
    .get(getAll)
    .post(create);

routerAnime.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerAnime;