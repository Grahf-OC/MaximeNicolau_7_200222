const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');
const User = require('./User');

const Message = sequelize.define('Message', {
  
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    imageUrl: {
        type: DataTypes.STRING,

    },

    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },


    /*usersLiked: {
        type: Sequelize.ARRAY, //NE MARCHE PAS AVEC MYSQL, chercher autre solution
        allowNull: false,
    },*/


});


module.exports = Message;