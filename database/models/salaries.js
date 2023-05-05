const { Model, Sequelize, sequelize } = require("../mysql");
const currencies = require("./currencies");
class salaries extends Model { };
salaries = sequelize.define('salaries', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: Sequelize.DOUBLE,
});
salaries.belongsTo(currencies);
currencies.hasMany(salaries);
module.exports = salaries;