const { Model, DataTypes, sequelize } = require("../../mysql");
const businesses = require("./businesses");
const sessions = require("../sessions");
const invoices = require("../invoices");
const services = require("../services");
class business_invoices extends Model { };
business_invoices = sequelize.define('business_invoices', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
businesses.belongsToMany(invoices, { through: business_invoices });
invoices.belongsToMany(businesses, { through: business_invoices });
businesses.belongsToMany(services, { through: business_invoices });
services.belongsToMany(businesses, { through: business_invoices });
business_invoices.belongsTo(sessions);
sessions.hasMany(business_invoices);
module.exports = business_invoices;