const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const sessions = require("./sessions");
class permissions extends Model { };
try {
    permissions = sequelize.define('permissions', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        permission: {
            type: Sequelize.ENUM('all', 'create', 'edit', 'delete', 'view'),
        },
    }, { paranoid: true });
    permissions.belongsTo(businesses);
    businesses.hasMany(permissions);
    permissions.belongsTo(sessions);
    sessions.hasMany(permissions);
    module.exports = permissions;
} catch (error) {
    console.log(error);
}
