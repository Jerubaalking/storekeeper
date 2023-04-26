const { Model, sequelize, DataTypes } = require("../mysql");
const stores = require("./stores");
const businesses = require("./businesses");
const sessions = require("./sessions");
const employees = require("./employees");
class employees_attendances extends Model { };
employees_attendances = sequelize.define('employee_attendances', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, { timestamps: true });

employees_attendances.belongsTo(businesses);
businesses.hasMany(employees_attendances);
employees_attendances.belongsTo(employees);
employees.hasMany(employees_attendances);
employees_attendances.belongsTo(sessions);
sessions.hasMany(employees_attendances);
employees_attendances.belongsTo(stores);
stores.hasMany(employees_attendances);
module.exports = employees_attendances;