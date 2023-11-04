const { getAll, getOne, update } = require('../controllers/new.controllers');
const { create, remove } = require('../controllers/imageCloudinary.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJwt');
const upload = require('../utils/multer');


const routerNew = express.Router();

routerNew.route('/')
    .get(getAll)
    .post(upload.single('image'), create)

routerNew.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerNew;