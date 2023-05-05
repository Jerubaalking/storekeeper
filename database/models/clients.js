const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businessees/businesses");
const sessions = require("./sessions");
const users = require("./users");
class clients extends Model { };
clients = sequelize.define('clients', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: Sequelize.STRING,
}, { paranoid: true });
clients.belongsTo(sessions);
sessions.hasMany(clients);
clients.belongsTo(users);
users.hasMany(clients);
module.exports = clients;