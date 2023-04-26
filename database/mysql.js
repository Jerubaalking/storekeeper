const dbConfig = require("../database/config");
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes, Model } = require("sequelize");

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = dbConfig;
const connection = await mysql.createConnection({ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD });
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig}\`;`);

// connect to db
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, { dialect: dbConfig.dialect });

// init models and add them to the exported db object

const Op = Sequelize.Op;

module.exports = { Sequelize, sequelize, DataTypes, Op, Model };