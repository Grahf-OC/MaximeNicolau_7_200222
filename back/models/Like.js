const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connector');

const Like = sequelize.define('Like', {
  like: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Like;
