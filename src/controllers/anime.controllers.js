const catchError = require('../utils/catchError');
const Anime = require('../models/Anime');
const Genre = require('../models/Genre');



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
    const body = { title, description, trailer, image, status, episode, releaseDate, lastepisode, userId: id }
    const result = await Anime.create(body);
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
    AddGenre

}