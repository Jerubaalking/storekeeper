const { Model, DataTypes, sequelize } = require("../../mysql");
const businesses = require("./businesses");
const contacts = require("../contacts");
class business_contacts extends Model { };
business_contacts = sequelize.define('business_contacts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
businesses.belongsToMany(contacts, { through: business_contacts });
contacts.belongsToMany(businesses, { through: business_contacts });
module.exports = business_contacts;