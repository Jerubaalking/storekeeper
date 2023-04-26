const { Model, Sequelize, sequelize } = require("../mysql");
const employees = require("./employees");
const stores = require("./stores");
class salaries extends Model { };
salaries = sequelize.define('salaries', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: Sequelize.DOUBLE,
    date_paid: Sequelize.DATE,
    month: Sequelize.STRING,
    employeeId: {
        type: Sequelize.INTEGER,
    },

});
salaries.belongsTo(stores);
stores.hasMany(salaries);
salaries.belongsTo(employees);
employees.hasMany(salaries);
salaries.belongsTo(stores);
stores.hasMany(salaries);
module.exports = salaries;