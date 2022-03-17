const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('./utils/connector');
const app = express();
require('dotenv').config()
const path = require('path');
const User = require('./models/User');
const Mess = require('./models/Mess');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

const synchro = async () => {
    await sequelize.sync({ alter: true }); 
    console.log("tables synchronized")
}
synchro();

module.exports = app;
