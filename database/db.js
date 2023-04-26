const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize(`sqlite::${__dirname}/school247.db`, {
  logging: true
});
module.exports = { sequelize, Model };