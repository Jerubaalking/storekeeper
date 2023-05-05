const customers = require("../customers");
const { Model, Sequelize, sequelize } = require("../mysql");
const addresses = require("../addresses");
const sessions = require("../sessions");
class customer_addresses extends Model { };
customer_addresses = sequelize.define('customer_addresses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
customers.belongsToMany(addresses, { through: customer_addresses });
addresses.belongsToMany(customers, { through: customer_addresses });

module.exports = customer_addresses;