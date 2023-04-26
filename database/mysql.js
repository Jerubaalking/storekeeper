const dbConfig = require("../database/config");
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes, Model } = require("sequelize");
var sequelize;
const initialize = async () => {
  const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = dbConfig;
  const connection = await mysql.createConnection({ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD });
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig}\`;`);
  sequelize = await new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, { dialect: dbConfig.dialect });
  return sequelize;

}


// connect to db

// init models and add them to the exported db object
initialize().then(ans => console.log(ans)).catch(err => console.log(err));
const Op = Sequelize.Op;

module.exports = { Sequelize, sequelize, DataTypes, Op, Model };