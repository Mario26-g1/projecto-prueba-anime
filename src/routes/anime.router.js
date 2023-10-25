const { getAll, create, getOne, remove, update, AddLista, AddGenre } = require('../controllers/anime.controllers');
const express = require('express');

const routerAnime = express.Router();

routerAnime.route('/')
    .get(getAll)
    .post(create)




routerAnime.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerAnime.route('/:id/listanime')
    .post(AddLista)

routerAnime.route('/:id/genres')
    .post(AddGenre)




module.exports = routerAnime;