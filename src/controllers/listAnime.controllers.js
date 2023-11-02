const catchError = require('../utils/catchError');
const ListAnime = require('../models/ListAnime');
const Anime = require('../models/Anime');


const getAll = catchError(async (req, res) => {
    const userId = req.user.id
    const results = await ListAnime.findAll({
        where: { userId },
        include: [
            {
                model: Anime,
                attributes: ['title', 'id'],
                through: {
                    attributes: [], // Esto excluye todos los atributos de la tabla pivot (AnimeLista)
                }
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { id } = req.user
    const { title, description } = req.body
    const body = { title, description, userId: id }
    const result = await ListAnime.create(body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const userId = req.user.id
    const { id } = req.params;
    const result = await ListAnime.findByPk(id, {
        where: { userId },
        include: [
            {
                model: Anime,
                attributes: ['title'],
                through: {
                    attributes: [], // Esto excluye todos los atributos de la tabla pivot (AnimeLista)
                }
            }
        ]
    });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await ListAnime.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await ListAnime.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const removeAnimeList = catchError(async (req, res) => {
    const { listanimeId, animeId } = req.params;

    // Primero, verifica si la lista existe
    const list = await ListAnime.findByPk(listanimeId);
    if (!list) {
        return res.status(404).json({ error: 'Lista no encontrada' });
    }

    // Luego, verifica si el anime existe
    const anime = await Anime.findByPk(animeId);
    if (!anime) {
        return res.status(404).json({ error: 'Anime no encontrado' });
    }

    // Ahora puedes eliminar el anime de la lista utilizando el método adecuado de Sequelize
    await list.removeAnime(anime);

    // Responde con un mensaje de éxito
    return res.json({ message: 'Anime eliminado de la lista con éxito' });
});




module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    removeAnimeList


}