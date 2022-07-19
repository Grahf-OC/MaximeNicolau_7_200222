const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');
const Message = require('./Message');
const Like = require('./Like');
const Comment = require('./Comment');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'email',
  },

  // https://github.com/sequelize/sequelize/issues/9653#issuecomment-959790249

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  picture: {
    type: DataTypes.STRING,
    defaultValue: 'http://localhost:3000/images/default-profile.png',
  },

  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

User.hasMany(Message, {
  onDelete: 'CASCADE',
});
User.hasMany(Like, {
  onDelete: 'CASCADE',
});
User.hasMany(Comment, {
  onDelete: 'CASCADE',
});

Message.belongsTo(User);
Like.belongsTo(User);
Comment.belongsTo(User);

module.exports = User;
