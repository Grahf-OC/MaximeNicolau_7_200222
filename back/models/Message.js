const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');
const Like = require('./Like');
const Comment = require('./Comment');

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

Message.hasMany(Like, {
  onDelete: 'CASCADE',
});

Message.hasMany(Comment, {
  onDelete: 'CASCADE',
});

Like.belongsTo(Message);
Comment.belongsTo(Message);

module.exports = Message;
