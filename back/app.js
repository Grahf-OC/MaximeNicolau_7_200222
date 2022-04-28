/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const sequelize = require('./utils/connector');
// const messRoutes = require('./routes/mess');
const userRoutes = require('./routes/user');

const app = express();
require('dotenv').config();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());

const synchro = async () => {
  await sequelize.sync({ alter: true });
  console.log('tables synchronized');
};
synchro();

app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/api/mess', messRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
