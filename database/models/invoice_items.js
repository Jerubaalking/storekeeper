const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const clients = require("./clients");
const invoices = require("./invoices");
const items = require("./items");
const sessions = require("./sessions");
const users = require("./users");
class invoice_items extends Model { };
invoice_items = sequelize.define('invoice_items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
invoices.belongsToMany(items, { through: invoice_items });
items.belongsToMany(invoices, { through: invoice_items });
module.exports = invoice_items;