
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes, Model } = require("sequelize");
var sequelize;
const initialize = async () => {
  const dbConfig = await require("../database/config");
  const connection = await mysql.createConnection(await dbConfig);
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${await dbConfig}\`;`);
  sequelize = await new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, { dialect: dbConfig.dialect });
  return sequelize;

}


// connect to db

// init models and add them to the exported db object
initialize().then(ans => console.log(ans)).catch(err => console.log(err));
const Op = Sequelize.Op;

module.exports = { Sequelize, sequelize, DataTypes, Op, Model };