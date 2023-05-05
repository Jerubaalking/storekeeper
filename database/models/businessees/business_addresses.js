const { Model, DataTypes, sequelize } = require("../../mysql");
const businesses = require("./businesses");
const contacts = require("../contacts");
class business_addresses extends Model { };
business_addresses = sequelize.define('business_addresses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
businesses.belongsToMany(contacts, { through: business_addresses });
contacts.belongsToMany(businesses, { through: business_addresses });
module.exports = business_addresses;