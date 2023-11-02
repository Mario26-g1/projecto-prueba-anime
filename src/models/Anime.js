const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Anime = sequelize.define('anime', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },

    trailer: {
        type: DataTypes.STRING,
        allowNull: true

    },
    image: {
        type: DataTypes.STRING,
        allowNull: true

    },
    status: {
        type: DataTypes.STRING,
        allowNull: true

    },
    episode: {
        type: DataTypes.STRING,
        allowNull: true

    },
    releaseDate: {
        type: DataTypes.STRING,
        allowNull: true

    },
    lastepisode: {
        type: DataTypes.STRING,
        allowNull: true

    },


});

module.exports = Anime;