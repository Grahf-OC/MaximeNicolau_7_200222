const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');
const Message = require('./Message');

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
    allowNull: true,
  },

  birthday: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

User.hasMany(Message);
Message.belongsTo(User);

module.exports = User;
