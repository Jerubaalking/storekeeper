const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const customers = require("./customers");
const employees = require("./employees");
const items = require("./items");
const payment_methods = require("./payment_methods");
const sessions = require("./sessions");
const stockIns = require("./stockIns");
const stockOuts = require("./stockOuts");
const stores = require("./stores");
const users = require("./users");
class transactions extends Model { };
transactions = sequelize.define('transactions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: Sequelize.DOUBLE,
    receipt: Sequelize.STRING,
    code: Sequelize.STRING,
    date: Sequelize.STRING,
    verified: Sequelize.BOOLEAN,
    status: {
        type: Sequelize.ENUM('credit', 'debit', 'pending'),
        defaultValue: 'pending',
        allowNull: false
    },
    response: {
        type: Sequelize.STRING,
    }
}, { paranoid: true });

transactions.belongsTo(payment_methods);
payment_methods.hasMany(transactions);
transactions.belongsTo(sessions);
sessions.hasMany(transactions);

module.exports = transactions;