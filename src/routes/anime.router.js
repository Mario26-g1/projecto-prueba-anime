const { getAll, create, getOne, remove, update, AddLista, AddGenre, AddListaPre } = require('../controllers/anime.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt');
const upload = require('../utils/multer');


const routerAnime = express.Router();

routerAnime.route('/')
    .get(getAll)
    .post(upload.single('image'), verifyJwt, create)




routerAnime.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

routerAnime.route('/:id/listanime')
    .post(verifyJwt, AddLista)

routerAnime.route('/:id/listanimePre')
    .post(AddListaPre)

routerAnime.route('/:id/genres')
    .post(verifyJwt, AddGenre)




module.exports = routerAnime;