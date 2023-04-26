
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes, Model } = require("sequelize");

const initializeSequalize = async () => {
  const dbConfig = await require("../database/config");
  const connection = await mysql.createConnection(await dbConfig);
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${await dbConfig}\`;`);
  return await new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, { dialect: dbConfig.dialect });

}

const sequelize = initializeSequalize().then(async seq => await seq).catch(err => {
  console.log(err);
})
// connect to db

// init models and add them to the exported db object

const Op = Sequelize.Op;

module.exports = { Sequelize, sequelize, DataTypes, Op, Model };