const { Model, DataTypes, sequelize } = require("../mysql");
const businesses = require("./businesses");
const users = require("./users");
const departments = require("./departments");
const stores = require("./stores");
class store_employees extends Model { };
store_employees = sequelize.define('store_employees', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nida: DataTypes.STRING,
    social_link: DataTypes.STRING,
    about: DataTypes.STRING,
    designation: DataTypes.STRING,
    show_on_website: DataTypes.STRING,
}, { sequelize, paranoid: true });
store_employees.belongsTo(stores);
stores.hasMany(store_employees);
store_employees.belongsTo(users);
users.hasMany(store_employees);
store_employees.belongsTo(departments);
departments.hasMany(store_employees);
module.exports = store_employees;