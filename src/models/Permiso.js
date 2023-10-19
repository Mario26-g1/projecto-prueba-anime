const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Permiso = sequelize.define('permiso', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Permiso;