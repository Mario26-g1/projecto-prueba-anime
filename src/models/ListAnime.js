const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ListAnime = sequelize.define('listanime', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = ListAnime;