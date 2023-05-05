const { Model, sequelize, DataTypes } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
class store_employee_attendances extends Model { };
store_employee_attendances = sequelize.define('store_employee_attendances', {
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

store_employee_attendances.belongsTo(sessions);
sessions.hasMany(store_employee_attendances);
store_employee_attendances.belongsTo(stores);
stores.hasMany(store_employee_attendances);
module.exports = store_employee_attendances;