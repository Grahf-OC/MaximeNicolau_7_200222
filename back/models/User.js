const {DataTypes} = require('sequelize');
const sequelize = require('../utils/connector');

const userModel = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = userModel;