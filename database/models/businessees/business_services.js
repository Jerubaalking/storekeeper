const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("../stores/stores");
const businesses = require("./businesses");
const services = require("../services");
class business_services extends Model { };
business_services = sequelize.define('business_services', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });

businesses.belongsToMany(services, { through: business_services });
services.belongsToMany(businesses, { through: business_services });
business_services.belongsTo(stores);
stores.hasMany(business_services);
module.exports = business_services;