const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');

const Comment = sequelize.define('Comment', {
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Comment;
