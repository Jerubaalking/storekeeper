const { Model, DataTypes, sequelize } = require("../mysql");
const businesses = require("./businesses");
const users = require("./users");
const departments = require("./departments");
class employees extends Model { };
employees = sequelize.define('employees', {
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
employees.belongsTo(businesses);
businesses.hasMany(employees);
employees.belongsTo(users);
users.hasMany(employees);
employees.belongsTo(departments);
departments.hasMany(employees);
module.exports = employees;