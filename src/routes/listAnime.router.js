const { getAll, create, getOne, remove, update, removeAnimeList } = require('../controllers/listAnime.controllers');
const express = require('express');

const routerListAnime = express.Router();

routerListAnime.route('/')
    .get(getAll)
    .post(create);

routerListAnime.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);



routerListAnime.route('/:listanimeId/anime/:animeId')
    .delete(removeAnimeList);



module.exports = routerListAnime;