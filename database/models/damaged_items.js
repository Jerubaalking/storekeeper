const { Model, DataTypes, sequelize } = require("../mysql");
const deductions = require("./deductions");
const salaries = require("./salaries");
const businesses = require("./businesses");
const sessions = require("./sessions");
const stockIns = require("./stockIns");
const items = require("./items");
class damaged_items extends Model { };
damaged_items = sequelize.define('damaged_items', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    damage_info: {
        type: DataTypes.TEXT,
    }
}, { paranoid: true });

stockIns.belongsToMany(items, { through: damaged_items });
items.belongsToMany(stockIns, { through: damaged_items });
module.exports = damaged_items;