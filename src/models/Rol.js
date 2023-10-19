const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Rol = sequelize.define('rol', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Rol;