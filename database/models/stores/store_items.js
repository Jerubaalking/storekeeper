const { Model, Sequelize, sequelize } = require("../../mysql");
const items = require("../items");
const stores = require("./stores");
class store_items extends Model { };
store_items = sequelize.define('store_items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
items.belongsToMany(stores, { through: store_items });
stores.belongsToMany(items, { through: store_items });
module.exports = store_items;