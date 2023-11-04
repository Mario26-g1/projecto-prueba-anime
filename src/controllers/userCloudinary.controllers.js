// función creada anteriormente en utils


const User = require('../models/User');
const catchError = require('../utils/catchError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const bcrypt = require('bcrypt')


// ...

const create = catchError(async (req, res) => {
    const { name, email, password, profilePicture } = req.body;
    const hashPassword = password ? await bcrypt.hash(password, 10) : null;
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);
    const body = { name, email, password: hashPassword, profilePicture: url, filename: public_id }
    const image = await User.create(body);
    return res.status(201).json(image);
});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await User.findByPk(id);
    if (!image) return res.sendStatus(404);
    await deleteFromCloudinary(image.filename);
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    create,
    remove
}