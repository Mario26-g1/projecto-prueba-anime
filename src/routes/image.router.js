const { getAll, create } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const { verifyJwt } = require('../utils/verifyJwt');

const routerImage = express.Router();

routerImage.route('/')
    .get(getAll)
    .post(upload.single('image'), verifyJwt, create)

module.exports = routerImage;