const { Model, Sequelize, sequelize } = require("../mysql");
class roles extends Model { };
roles = sequelize.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role: {
        type: Sequelize.ENUM('superadmin', 'admin', 'system-manager', 'customer-personel', 'employee-accountant', 'employee-sales', 'employee-marketing', 'employee-manager', 'employee-driver', 'employee-security', 'employee-hr', 'employee-semi-skilled'),
        defaultValue: 'employee-semi-skilled',
    },
}, { paranoid: true });
module.exports = roles;