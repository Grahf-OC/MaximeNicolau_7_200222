/* eslint-disable no-console */
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PW,
  {
    dialect: 'mysql',
    host: 'localhost',
  },
);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('connection succesful!');
  } catch (error) {
    console.log(error, 'unable to connect');
  }
};
dbConnect();

console.log('ça marche');

module.exports = sequelize;
