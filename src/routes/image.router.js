const { getAll, create } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');

const routerImage = express.Router();

routerImage.route('/')
    .get(getAll)
    .post(upload.single('image'), create)

module.exports = routerImage;