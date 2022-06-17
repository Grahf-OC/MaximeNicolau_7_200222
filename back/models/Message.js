const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');

const Message = sequelize.define('Message', {
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Message;
