const { getAll, create, getOne, remove, update } = require('../controllers/permiso.controllers');
const express = require('express');

const routerPermiso = express.Router();

routerPermiso.route('/')
    .get(getAll)
    .post(create);

routerPermiso.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerPermiso;