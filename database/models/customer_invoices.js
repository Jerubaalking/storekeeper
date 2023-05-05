const { Model, Sequelize, sequelize } = require("../mysql");
const customers = require("./customers");
const invoices = require("./invoices");
class customer_invoices extends Model { };
customer_invoices = sequelize.define('customer_invoices', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
customers.belongsToMany(invoices, { through: customer_invoices });
invoices.belongsToMany(customers, { through: customer_invoices });
module.exports = customer_invoices;