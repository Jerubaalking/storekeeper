const { Model, DataTypes, sequelize } = require("../mysql");

const businesses = require("./businesses");
const sessions = require("./sessions");
class deductions extends Model { };
deductions = sequelize.define('deductions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    percent: DataTypes.DOUBLE,
    amount: DataTypes.DOUBLE,
}, { paranoid: true });
deductions.belongsTo(businesses);
businesses.hasMany(deductions);
deductions.belongsTo(sessions);
sessions.hasMany(deductions);
module.exports = deductions;