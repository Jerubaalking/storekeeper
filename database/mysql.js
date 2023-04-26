const dbConfig = require("../database/config");

const { Sequelize, DataTypes, Model } = require("sequelize");
var sequelize;
try {

  sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
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
} catch (err) {
  console.log(err);
}
const Op = Sequelize.Op;

module.exports = { Sequelize, sequelize, DataTypes, Op, Model };