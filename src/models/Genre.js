const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Genre = sequelize.define('genre', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = Genre;