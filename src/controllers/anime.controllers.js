const catchError = require('../utils/catchError');
const Anime = require('../models/Anime');
const Genre = require('../models/Genre');
const Image = require('../models/Image');




const getAll = catchError(async (req, res) => {
    const results = await Anime.findAll({
        include: [
            {
                model: Genre,
                attributes: ['title']
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { id } = req.user
    const { title, description, trailer, image, status, episode, releaseDate, lastepisode } = req.body

    let imageResult = null;

    if (req.file) {
        const { filename } = req.file;
        const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`;
        imageResult = await Image.create({ filename, url });
    }


    const result = await Anime.create({
        title,
        description,
        trailer,
        image: imageResult ? `${imageResult.url}` : null,
        status,
        episode,
        releaseDate,
        lastepisode,
        userId: id
    });
    return res.status(201).json(result);
});
// En el controlador de Anime


const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Anime.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Anime.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Anime.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const AddLista = catchError(async (req, res) => {
    const userId = req.user.id
    const { id } = req.params;
    const anime = await Anime.findByPk(id, { where: { userId } })

    await anime.setListanimes(req.body)
    const animes = await anime.getListanimes()


    return res.json(animes)
});
const AddListaPre = catchError(async (req, res) => {

    const listanimepreId = req.params.id;
    const anime = await Anime.findByPk(listanimepreId)

    await anime.setListanimepres(req.body)
    const animes = await anime.getListanimepres()

    return res.json(animes)
});


const AddGenre = catchError(async (req, res) => {
    const userId = req.user.id
    const { id } = req.params;
    const anime = await Anime.findByPk(id, { where: { userId } })

    await anime.setGenres(req.body)
    const animes = await anime.getGenres()

    return res.json(animes)
});





module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    AddLista,
    AddGenre,
    AddListaPre

}