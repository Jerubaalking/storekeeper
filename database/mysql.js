const dbConfig = require("../database/config");
const { Sequelize, DataTypes, Model } = require("sequelize");
const mysql = require("mysql2");
process.env.NODE_ENV = 'production';
const connection = mysql.createConnection({
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD
});
connection.query(
  `DROP DATABASE IF EXISTS storekeeper247_db`,
  function (err, results) {
    console.log('error............>', results);
    console.log(err);
  }
);
// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS storekeeper247_db`,
  function (err, results) {
    console.log('error............>', results);
    console.log(err);
  }
);

// Close the connection
console.log(dbConfig);
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST2,
  port: dbConfig.DB_PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    timezone: '+03:00',
  },
  logging: true
});

const Op = Sequelize.Op;
connection.end();

module.exports = { Sequelize, sequelize, DataTypes, Op, Model };
