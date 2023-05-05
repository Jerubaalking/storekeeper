const { Model, DataTypes, sequelize } = require("../mysql");

const businesses = require("./businessees/businesses");
const sessions = require("./sessions");
class deductions extends Model { };
deductions = sequelize.define('deductions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    percent: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { paranoid: true });
module.exports = deductions;