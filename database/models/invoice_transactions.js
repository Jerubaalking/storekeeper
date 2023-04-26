const { Model, DataTypes, sequelize } = require("../mysql");
const invoices = require("./invoices");
const transactions = require("./transactions");
class invoice_transactions extends Model { };
invoice_transactions = sequelize.define('invoice_transactions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
invoices.belongsToMany(transactions, { through: invoice_transactions });
transactions.belongsToMany(invoices, { through: invoice_transactions });
module.exports = invoice_transactions;