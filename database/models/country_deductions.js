const { Model, DataTypes, sequelize } = require("../mysql");
const businesses = require("./businesses");
const sessions = require("./sessions");
const countries = require("./countries");
const deductions = require("./deductions");
class country_deductions extends Model { };
country_deductions = sequelize.define('country_deductions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
countries.belongsToMany(deductions, { through: country_deductions });
deductions.belongsToMany(countries, { through: country_deductions });
country_deductions.belongsTo(sessions);
sessions.hasMany(country_deductions);
module.exports = country_deductions;