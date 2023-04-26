const { Model, DataTypes, sequelize } = require("../mysql");
const businesses = require("./businesses");
const permissions = require("./permissions");
const roles = require("./roles");
const sessions = require("./sessions");
const user_roles = require("./user_roles");
class user_role_permissions extends Model { };

user_role_permissions = sequelize.define('user_role_permissions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});

permissions.belongsToMany(roles, { through: user_role_permissions });
roles.belongsToMany(permissions, { through: user_role_permissions });
module.exports = user_role_permissions;