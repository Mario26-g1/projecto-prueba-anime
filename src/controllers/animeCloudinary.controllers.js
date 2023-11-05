// función creada anteriormente en utils

const Anime = require('../models/Anime');
const catchError = require('../utils/catchError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');


// ...

const create = catchError(async (req, res) => {
    const { id } = req.user
    const { title, description, trailer, image, status, episode, releaseDate, lastepisode } = req.body
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);

    const images = await Anime.create(
        { title, description, trailer, image: url, status, episode, releaseDate, lastepisode, filename: public_id, userId: id }
    );
    return res.status(201).json(images);
});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await Anime.findByPk(id);
    if (!image) return res.sendStatus(404);
    await deleteFromCloudinary(image.filename);
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    create,
    remove
}