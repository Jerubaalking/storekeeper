const { Model, Sequelize, sequelize } = require("../mysql");
class roles extends Model { };
roles = sequelize.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role: {
        type: Sequelize.ENUM('superadmin', 'admin', 'business-admin', 'business-manager', 'business-accountant', 'store-admin', 'store-manager', 'store-accountant', 'store-stocker', 'store-sales', 'store-marketing', 'customer', 'generic'),
        defaultValue: 'generic',
    },
}, { paranoid: true });
module.exports = roles;