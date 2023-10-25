const { getAll, create, getOne, remove, update } = require('../controllers/listAnime.controllers');
const express = require('express');

const routerListAnime = express.Router();

routerListAnime.route('/')
    .get(getAll)
    .post(create);

routerListAnime.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);



// routerListAnime.route('/:id/anime')
//     .post(agregarAnimeALista)


module.exports = routerListAnime;