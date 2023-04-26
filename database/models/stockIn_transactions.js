const { Model, DataTypes, sequelize } = require("../mysql");
const invoices = require("./invoices");
const transactions = require("./transactions");
class stockIn_transactions extends Model { };
stockIn_transactions = sequelize.define('stockIn_transactions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
invoices.belongsToMany(transactions, { through: stockIn_transactions });
transactions.belongsToMany(invoices, { through: stockIn_transactions });
module.exports = stockIn_transactions;