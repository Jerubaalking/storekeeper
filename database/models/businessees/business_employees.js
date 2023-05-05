const { Model, DataTypes, sequelize } = require("../../mysql");
const users = require("../users");
const departments = require("../departments");
const stores = require("../stores/stores");
const currencies = require("../currencies");
class business_employees extends Model { };
business_employees = sequelize.define('business_employees', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nida: DataTypes.STRING,
    social_link: DataTypes.STRING,
    about: DataTypes.STRING,
    salary: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    show_on_website: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { sequelize, paranoid: true });
business_employees.belongsTo(users);
users.hasMany(business_employees);
currencies.belongsTo(users);
users.hasMany(currencies);
business_employees.belongsTo(departments);
departments.hasMany(business_employees);
module.exports = business_employees;