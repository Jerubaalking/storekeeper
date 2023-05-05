const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const contacts = require("../contacts");
class store_contacts extends Model { };
store_contacts = sequelize.define('store_contacts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(contacts, { through: store_contacts });
contacts.belongsToMany(stores, { through: store_contacts });
module.exports = store_contacts;