const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');
const Like = require('./Like');

const Message = sequelize.define('Message', {
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Message.hasMany(Like, {
  onDelete: 'CASCADE',
});

Like.belongsTo(Message);

module.exports = Message;
