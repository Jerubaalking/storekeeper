const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const clients = require("./clients");
const countries = require("./countries");
const sessions = require("./sessions");
const users = require("./users");
class regions extends Model { };
regions = sequelize.define('regions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, { paranoid: true });
regions.belongsTo(countries);
countries.hasMany(businesses);
module.exports = regions;