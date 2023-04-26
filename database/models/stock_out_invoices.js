const { Model, Sequelize, sequelize } = require("../mysql");
const invoices = require("./invoices");
const stock_outs = require("./stockOuts");

class stock_out_invoices extends Model { };
stock_out_invoices = sequelize.define('stock_out_invoices', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});
module.exports = stock_out_invoices;