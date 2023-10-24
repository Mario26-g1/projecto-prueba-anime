const catchError = require('../utils/catchError');
const Image = require('../models/Image');

const getAll = catchError(async (req, res) => {
    const result = await Image.findAll()
    return res.json(result)
});

const create = catchError(async (req, res) => {
    const { filename } = req.file;
    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`
    const result = await Image.create({ filename, url })
    return res.status(201).json(result)
});

module.exports = {
    getAll,
    create
}