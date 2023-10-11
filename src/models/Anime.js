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
    ReleaseDate: {
        type: DataTypes.DATE,
        allowNull: false

    },

});

module.exports = Anime;