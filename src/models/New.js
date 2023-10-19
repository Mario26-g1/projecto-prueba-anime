const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const New = sequelize.define('new', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateNotice: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

    },
});

module.exports = New;