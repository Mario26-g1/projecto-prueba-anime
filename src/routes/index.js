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
const verifyRol = require('../utils/verifyRol');
const verifyPermiso = require('../utils/verifyPermiso');


const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/genres', verifyJwt, verifyRol, verifyPermiso, routerGenre)
router.use('/animes', verifyJwt, verifyRol, verifyPermiso, routerAnime)
router.use('/listanimes', verifyJwt, verifyRol, verifyPermiso, routerListAnime)
router.use('/comments', verifyJwt, routerComment)
router.use('/posts', verifyJwt, verifyRol, verifyPermiso, routerPost)
router.use('/roles', verifyJwt, routerRol)
router.use('/Permisos', verifyJwt, routerPermiso)
router.use('/news', verifyJwt, verifyRol, verifyPermiso, routerNew)
router.use('/reviews', verifyJwt, verifyRol, verifyPermiso, routerReview)
router.use('/images', verifyJwt, verifyRol, verifyPermiso, routerImage)



module.exports = router;