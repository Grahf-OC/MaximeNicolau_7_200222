const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');


const Message = sequelize.define('Message', {
  
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  picture: {
    type: DataTypes.STRING,

  },

  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },




});


module.exports = Message;