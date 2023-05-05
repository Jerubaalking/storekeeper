const contacts = require("../contacts");
const customers = require("../customers");
const { Model, Sequelize, sequelize } = require("../mysql");
class client_businesses extends Model { };
client_businesses = sequelize.define('client_businesses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
customers.belongsToMany(contacts, { through: client_businesses });
contacts.belongsToMany(customers, { through: client_businesses });
module.exports = client_businesses;