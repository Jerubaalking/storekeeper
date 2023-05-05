const { Model, Sequelize, sequelize } = require("../../mysql");
const roles = require("../roles");
const sessions = require("../sessions");
const users = require("../users");
class store_owners extends Model { };
store_owners = sequelize.define('store_owners', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
store_owners.belongsTo(sessions);
sessions.hasMany(store_owners);

store_owners.belongsTo(users);
users.hasMany(store_owners);

store_owners.belongsTo(roles);
roles.hasMany(store_owners);
module.exports = store_owners;