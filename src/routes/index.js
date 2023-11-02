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
const routerImage = require('./image.router');
const { verifyJwt } = require('../utils/verifyJwt');
const routerLike = require('./like.router');
const routerListAnimePre = require('./listaPred.router');



const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/genres', verifyJwt, routerGenre)
router.use('/animes', routerAnime)
router.use('/listanimes', verifyJwt, routerListAnime)
router.use('/comments', routerComment)
router.use('/posts', routerPost)
router.use('/roles', verifyJwt, routerRol)
router.use('/Permisos', verifyJwt, routerPermiso)
router.use('/news', routerNew)
router.use('/reviews', routerReview)
router.use('/images', verifyJwt, routerImage)
router.use('/likes', routerLike)
router.use('/listasPres', routerListAnimePre)



module.exports = router;