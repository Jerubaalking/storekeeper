const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const employees = require("./employees");
const sessions = require("./sessions");
const customers = require("./customers");
const items = require("./items");
const currencies = require("./currencies");
class sales extends Model { };
sales = sequelize.define('sales', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    paid: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
    },
    pending: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
    },
    comment: {
        type: Sequelize.STRING
    },
    invoice_status: {
        type: Sequelize.ENUM('raised', 'complete', 'none'),
        defaultValue: 'none',
    },
    date: Sequelize.DATE,
});
sales.belongsTo(businesses);
businesses.hasMany(sales);
sales.belongsTo(customers);
customers.hasMany(sales);
sales.belongsTo(sessions);
sessions.hasMany(sales);
sales.belongsTo(currencies);
currencies.hasMany(sales);
sales.belongsTo(items);
items.hasMany(sales);
sales.belongsTo(employees);
employees.hasMany(sales);
module.exports = sales;