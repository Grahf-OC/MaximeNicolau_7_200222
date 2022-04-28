const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');
const Message = require('./Message');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

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
    allowNull: true,
  },

  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

User.hasMany(Message);
Message.belongsTo(User);

module.exports = User;
