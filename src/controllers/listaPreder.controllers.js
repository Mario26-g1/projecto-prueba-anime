const catchError = require('../utils/catchError');
const Anime = require('../models/Anime');
const ListAnimePre = require('../models/ListAnimePre');


const getAll = catchError(async (req, res) => {
    const results = await ListAnimePre.findAll({
        include: [
            {
                model: Anime,
                attributes: ['title', 'id'],
                through: {
                    attributes: []
                }
            }
        ]
    });
    return res.json(results);
});


const removeAnimeList = catchError(async (req, res) => {
    const { listanimepreId, animeId } = req.params;

    // Primero, verifica si la lista existe
    const list = await ListAnimePre.findByPk(listanimepreId);
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
    removeAnimeList

}