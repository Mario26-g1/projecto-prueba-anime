const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Post = sequelize.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Post;