const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const contacts = require("../contacts");
class store_addresses extends Model { };
store_addresses = sequelize.define('store_addresses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(contacts, { through: store_addresses });
contacts.belongsToMany(stores, { through: store_addresses });
module.exports = store_addresses;