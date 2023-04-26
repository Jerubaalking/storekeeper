const { Model, DataTypes, sequelize } = require("../mysql");
const stores = require("./stores");
const sessions = require("./sessions");
const customers = require("./customers");
const sales = require("./sales");
const sales_invoices = require("./stock_out_invoices");
class invoices extends Model { };
// class sales_invoices extends Model { };
invoices = sequelize.define('invoices', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    invoice_id: {
        type: DataTypes.STRING,
        unique: true,
    },
    level: {
        type: DataTypes.ENUM('profoma', 'invoice', 'sale'),
        defaultValue: 'profoma',
    },
    mailed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    discount_percent: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    comment: {
        type: DataTypes.STRING,
    },
    info: {
        type: DataTypes.STRING,
    }
}, { paranoid: true });

invoices.belongsTo(stores);
stores.hasMany(invoices);
invoices.belongsTo(sessions);
sessions.hasMany(invoices);
invoices.belongsTo(customers);
customers.hasMany(invoices);
module.exports = invoices;