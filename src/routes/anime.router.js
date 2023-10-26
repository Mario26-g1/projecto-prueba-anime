const { getAll, create, getOne, remove, update, AddLista, AddGenre } = require('../controllers/anime.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt');


const routerAnime = express.Router();

routerAnime.route('/')
    .get(getAll)
    .post(verifyJwt, create)




routerAnime.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

routerAnime.route('/:id/listanime')
    .post(verifyJwt, AddLista)

routerAnime.route('/:id/genres')
    .post(verifyJwt, AddGenre)




module.exports = routerAnime;