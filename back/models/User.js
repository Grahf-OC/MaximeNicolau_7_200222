const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');
const Message = require('./Message');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    picture: {
        type: DataTypes.STRING,

    },
    
});

User.hasMany(Message);
Message.belongsTo(User);


module.exports = User;