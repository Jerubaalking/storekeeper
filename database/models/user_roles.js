const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const roles = require("./roles");
const users = require("./users");
const user_role_permissions = require("./user_role_permissions");
class user_roles extends Model { };
user_roles = sequelize.define('user_roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});

roles.belongsToMany(users, { through: user_roles });
users.belongsToMany(roles, { through: user_roles });
users.belongsToMany(businesses, { through: user_roles });
businesses.belongsToMany(users, { through: user_roles });
module.exports = user_roles;