const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const fs = require('fs')
const path = require('path')



const getAll = catchError(async (req, res) => {
    const result = await Image.findAll()
    return res.json(result)
});

const create = catchError(async (req, res) => {
    const { id } = req.user

    const { filename } = req.file;
    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`
    const result = await Image.create({ filename, url, userId: id })
    return res.status(201).json(result)
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;

    const result = await Image.findByPk(id)
    if (!result) return res.sendStatus(404);
    fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', `${result.filename}`))

    await result.destroy();

    return res.sendStatus(204);


});

module.exports = {
    getAll,
    create,
    remove
}