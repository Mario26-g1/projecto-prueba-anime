const { getAll } = require('../controllers/image.controllers');
const { create, remove } = require('../controllers/imageCloudinary.controllers');

const express = require('express');
const upload = require('../utils/multer');


const routerImage = express.Router();

routerImage.route('/')
    .get(getAll)
    .post(upload.single('image'), create)

routerImage.route('/:id')
    .delete(remove)

module.exports = routerImage;