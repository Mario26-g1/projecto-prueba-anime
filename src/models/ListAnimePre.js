const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ListAnimePre = sequelize.define('listanimepre', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = ListAnimePre;