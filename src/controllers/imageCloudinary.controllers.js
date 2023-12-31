// función creada anteriormente en utils

const Image = require('../models/Image');
const catchError = require('../utils/catchError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');


// ...

const create = catchError(async (req, res) => {
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);
    const body = { url, filename: public_id }
    const image = await Image.create(body);
    return res.status(201).json(image);
});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if (!image) return res.sendStatus(404);
    await deleteFromCloudinary(image.filename);
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    create,
    remove
}