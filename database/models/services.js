const { Model, DataTypes, sequelize } = require("../mysql");
class services extends Model { };
// class sales_services extends Model { };
services = sequelize.define('services', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    days: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    charges_per_days: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    terms_and_conditions: {
        type: DataTypes.STRING,
    }
}, { paranoid: true });
module.exports = services;