const { Model, sequelize, DataTypes } = require("../../mysql");
const businesses = require("./businesses");
const sessions = require("../sessions");
class business_employees_attendances extends Model { };
business_employees_attendances = sequelize.define('employee_attendances', {
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
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, { timestamps: true });

business_employees_attendances.belongsTo(sessions);
sessions.hasMany(business_employees_attendances);
business_employees_attendances.belongsTo(businesses);
businesses.hasMany(business_employees_attendances);
module.exports = business_employees_attendances;