const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Anime = sequelize.define('anime', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    trailer: {
        type: DataTypes.STRING,
        allowNull: false

    },
    image: {
        type: DataTypes.STRING,
        allowNull: false

    },
    status: {
        type: DataTypes.STRING,
        allowNull: false

    },
    episode: {
        type: DataTypes.STRING,
        allowNull: false

    },
    releaseDate: {
        type: DataTypes.STRING,
        allowNull: false

    },
    lastepisode: {
        type: DataTypes.STRING,
        allowNull: false

    },


});

module.exports = Anime;