const { Model, DataTypes, sequelize } = require("../mysql");
const deductions = require("./deductions");
const salaries = require("./salaries");
const businesses = require("./businessees/businesses");
const sessions = require("./sessions");
class deductions_charts extends Model { };
deductions_charts = sequelize.define('deduction_charts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
deductions_charts.belongsTo(businesses);
businesses.hasMany(deductions_charts);
deductions_charts.belongsTo(sessions);
sessions.hasMany(deductions_charts);
deductions_charts.belongsTo(salaries);
salaries.hasMany(deductions_charts);
deductions_charts.belongsTo(deductions);
deductions.hasMany(deductions_charts);
module.exports = deductions_charts;