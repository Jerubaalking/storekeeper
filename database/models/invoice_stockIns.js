const { Model, DataTypes, sequelize } = require("../mysql");
const invoices = require("./invoices");
const items = require("./items");
const stockIns = require("./stockIns");
class invoice_stockIns extends Model { };
invoice_stockIns = sequelize.define('invoice_stockIns', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    discount_percent: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    discount_amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    status: {
        type: DataTypes.ENUM('quoted', 'bought'),
        defaultValue: 'quoted'
    }
});
invoices.belongsToMany(stockIns, { through: invoice_stockIns });
stockIns.belongsToMany(invoices, { through: invoice_stockIns });
module.exports = invoice_stockIns;