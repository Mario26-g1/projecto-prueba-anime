const express = require('express');
const routerUser = require('./user.router');
const routerGenre = require('./genre.router');
const routerAnime = require('./anime.router');
const routerListAnime = require('./listAnime.router');
const routerComment = require('./comment.router');
const routerPost = require('./post.router');
const routerRol = require('./rol.router');
const routerPermiso = require('./permiso.router');
const routerNew = require('./new.router');
const routerReview = require('./review.router');


const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/genres', routerGenre)
router.use('/animes', routerAnime)
router.use('/listanimes', routerListAnime)
router.use('/comments', routerComment)
router.use('/posts', routerPost)
router.use('/roles', routerRol)
router.use('/Permisos', routerPermiso)
router.use('/news', routerNew)
router.use('/reviews', routerReview)



module.exports = router;