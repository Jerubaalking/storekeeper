const { Model, Sequelize, sequelize } = require("../mysql");
const payment_methods = require("./payment_methods");
const sessions = require("./sessions");
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
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
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