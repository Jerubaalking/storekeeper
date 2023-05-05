const { Model, Sequelize, sequelize } = require("../mysql");
const item_categories = require("./item_categories");
const stores = require("./stores");
const sessions = require("./sessions");
class measurements extends Model { };
measurements = sequelize.define('measurements', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    symbol: Sequelize.STRING,
    application: {
        type: Sequelize.ENUM('volume', 'weight', 'mass', 'temperature', 'pressure', 'size', 'count'),
        defaultValue: 'count',
    },
});
module.exports = measurements;