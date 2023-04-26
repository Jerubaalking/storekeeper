const dbConfig = require("../database/config");
const { Sequelize, DataTypes, Model } = require("sequelize");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "thina2023",
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS storekeeper_db`,
  function (err, results) {
    console.log(results);
    console.log(err);
  }
);

// Close the connection
connection.end();
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: false
});

const Op = Sequelize.Op;

module.exports = { Sequelize, sequelize, DataTypes, Op, Model };