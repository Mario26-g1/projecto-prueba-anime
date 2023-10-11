const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Comment = sequelize.define('comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateComment: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW



    },
});

module.exports = Comment;