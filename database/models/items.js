const { Model, Sequelize, sequelize } = require("../mysql");
const item_categories = require("./item_categories");
const stores = require("./stores");
const sessions = require("./sessions");
class items extends Model { };
items = sequelize.define('items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    model: Sequelize.STRING,
    version: Sequelize.STRING,
    batch: Sequelize.STRING,
    barcode: Sequelize.STRING,
    serial_number: Sequelize.STRING,
    type: {
        type: Sequelize.ENUM('liquid', 'gas', 'solid', 'powder', 'organic', 'unknown'),
        defaultValue: 'unknown',
    },
});
items.belongsTo(stores);
stores.hasMany(items);
items.belongsTo(item_categories);
item_categories.hasMany(items);
items.belongsTo(sessions);
sessions.hasMany(items);
module.exports = items;