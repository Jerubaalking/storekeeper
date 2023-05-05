const { Model, Sequelize, sequelize } = require("../../mysql");
const invoices = require("../invoices");
const stores = require("./stores");
class store_service_invoices extends Model { };
store_service_invoices = sequelize.define('store_service_invoices', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(invoices, { through: store_service_invoices });
invoices.belongsToMany(stores, { through: store_service_invoices });
module.exports = store_service_invoices;