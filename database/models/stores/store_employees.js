const { Model, DataTypes, sequelize, Sequelize } = require("../../mysql");
const users = require("../users");
const departments = require("../departments");
const stores = require("./stores");
class store_employees extends Model { };
store_employees = sequelize.define('store_employees', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nida: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    social_security_number: {
        type: DataTypes.STRING,
        unique: true
    },
    social_link: DataTypes.STRING,
    about: DataTypes.STRING,
    designation: DataTypes.STRING,
    show_on_website: DataTypes.STRING,
    status: {
        type: Sequelize.ENUM('employed', 'fired', 'leave')
    }
}, { sequelize, paranoid: true });
store_employees.belongsTo(stores);
stores.hasMany(store_employees);
store_employees.belongsTo(users);
users.hasMany(store_employees);
store_employees.belongsTo(departments);
departments.hasMany(store_employees);
module.exports = store_employees;