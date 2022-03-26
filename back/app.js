const express = require('express');
const sequelize = require('./utils/connector');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

const synchro = async () => {
  await sequelize.sync({ alter: true }); 
  console.log('tables synchronized');
};
synchro();

module.exports = app;
