const catchError = require('../utils/catchError');
const Comment = require('../models/Comment');
const Anime = require('../models/Anime');
const Post = require('../models/Post');
const Review = require('../models/Review');

const getAll = catchError(async (req, res) => {
    const results = await Comment.findAll({
        include: [
            {
                model: Anime,
                attributes: ['title']
            },
            {
                model: Post,
                attributes: ['title']
            },
            {
                model: Review,
                attributes: ['content']
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { id } = req.user;
    const { reviewId, postId, animeId, content } = req.body;
    const body = { content, userId: id, animeId, reviewId, postId }
    const result = await Comment.create(body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Comment.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Comment.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Comment.update(
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