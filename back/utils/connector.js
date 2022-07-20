/* eslint-disable no-console */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('p7db', 'grahf', 'mlkjh', {
  dialect: 'mysql',
  host: 'localhost',
});

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
