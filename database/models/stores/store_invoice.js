const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const customers = require("../customers");
const invoices = require("../invoices");
class store_invoice extends Model { };
store_invoice = sequelize.define('store_invoice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(invoices, { through: store_invoice });
invoices.belongsTo(stores, { through: store_invoice });

invoices.belongsToMany(customers, { through: store_invoice });
customers.belongsTo(invoices, { through: store_invoice });

module.exports = store_invoice;