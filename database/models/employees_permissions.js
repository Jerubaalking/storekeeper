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
    sell: DataTypes.STRING,
    buy: DataTypes.STRING,
    access_store: DataTypes.STRING,
    customer_care: DataTypes.STRING,
},);
employees_permissions.belongsTo(stores);
stores.hasMany(employees_permissions);
employees_permissions.belongsTo(businesses);
businesses.hasMany(employees_permissions);
employees_permissions.belongsTo(employees);
employees.hasMany(employees_permissions);
module.exports = employees_permissions;