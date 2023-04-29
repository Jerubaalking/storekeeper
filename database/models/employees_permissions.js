const { Model, DataTypes, sequelize } = require("../mysql");
const stores = require("./stores");
const employees = require("./employees");
const businesses = require("./businesses");
class employees_permissions extends Model { };
employees_permissions = sequelize.define('employees_permissions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    sell: DataTypes.BOOLEAN,
    buy: DataTypes.BOOLEAN,
    access_store: DataTypes.BOOLEAN,
    customer_care: DataTypes.BOOLEAN,
},);
employees_permissions.belongsTo(stores);
stores.hasMany(employees_permissions);
employees_permissions.belongsTo(employees);
employees.hasMany(employees_permissions);
module.exports = employees_permissions;