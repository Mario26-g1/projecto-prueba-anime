const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Review = sequelize.define('review', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reviewDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

    },
});

module.exports = Review;