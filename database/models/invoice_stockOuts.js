const { Model, DataTypes, sequelize } = require("../mysql");
const invoices = require("./invoices");
const stockOuts = require("./stockOuts");
class invoice_stockOuts extends Model { };
invoice_stockOuts = sequelize.define('invoice_stockOuts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
invoices.belongsToMany(stockOuts, { through: invoice_stockOuts });
stockOuts.belongsToMany(invoices, { through: invoice_stockOuts });
module.exports = invoice_stockOuts;