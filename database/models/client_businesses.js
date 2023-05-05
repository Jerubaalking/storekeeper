const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businessees/businesses");
const clients = require("./clients");
const sessions = require("./sessions");
class client_businesses extends Model { };
client_businesses = sequelize.define('client_businesses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
businesses.belongsToMany(clients, { through: client_businesses });
clients.belongsToMany(businesses, { through: client_businesses });
module.exports = client_businesses;