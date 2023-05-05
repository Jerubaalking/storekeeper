const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businessees/businesses");
const roles = require("./roles");
const clients = require("./clients");
class client_business_roles extends Model { };
client_business_roles = sequelize.define('client_business_roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});

roles.belongsToMany(clients, { through: client_business_roles });
clients.belongsToMany(roles, { through: client_business_roles });

client_business_roles.belongsTo(businesses);
businesses.hasMany(client_business_roles);

module.exports = client_business_roles;