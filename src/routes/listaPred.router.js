const { getAll, remove, removeAnimeList, } = require('../controllers/listaPreder.controllers');
const express = require('express');

const routerListAnimePre = express.Router();

routerListAnimePre.route('/')
    .get(getAll)


routerListAnimePre.route('/:listanimepreId/anime/:animeId')
    .delete(removeAnimeList)


module.exports = routerListAnimePre;