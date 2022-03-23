const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');
const User = require('./User');

const Message = sequelize.define('Message', {
  
    content: {
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

    modified: {
        type: DataTypes.DATE,
    }


    /*usersLiked: {
        type: Sequelize.ARRAY, //NE MARCHE PAS AVEC MYSQL, chercher autre solution
        allowNull: false,
    },*/


});


module.exports = Message;