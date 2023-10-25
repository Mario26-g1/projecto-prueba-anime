const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Like = sequelize.define('like', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Like;