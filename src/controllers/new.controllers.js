const catchError = require('../utils/catchError');
const New = require('../models/New');

const getAll = catchError(async (req, res) => {
    const results = await New.findAll();
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const userId = req.user.id
    const { title, image, description, dateNotice } = req.body
    const body = { title, image, description, dateNotice, userId }
    const result = await New.create(body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await New.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await New.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await New.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}