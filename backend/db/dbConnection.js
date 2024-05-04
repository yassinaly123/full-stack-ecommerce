const mysql = require('mysql');
require('dotenv').config({ path: "./config.env" });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME ,process.env.USER , process.env.PASSWORD , {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;