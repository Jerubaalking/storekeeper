const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businessees/businesses");
const items = require("./items");
const sessions = require("./sessions");
const stores = require("./stores/stores");
class purchase_items extends Model { };
purchase_items = sequelize.define('stock_ins', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    buying_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    selling_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    qty: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    batch_number: Sequelize.STRING,
    manufacture_batch_number: Sequelize.STRING,
    manufacture_date: Sequelize.DATE,
    expire_date: Sequelize.DATE,
    manufacturer: Sequelize.STRING,
    item_weight: Sequelize.STRING,
    container: Sequelize.STRING,
    container_weight: Sequelize.STRING,
    qty_per_container: Sequelize.DOUBLE,
    receive_date: Sequelize.DATE,
    other_specs: Sequelize.STRING,
    inspected: Sequelize.BOOLEAN,

    comment: Sequelize.STRING,
}, { paranoid: true });

purchase_items.belongsTo(items);
items.hasMany(purchase_items);
purchase_items.belongsTo(sessions);
sessions.hasMany(purchase_items);
purchase_items.belongsTo(businesses);
businesses.hasMany(purchase_items);
purchase_items.belongsTo(stores);
stores.hasMany(purchase_items);

module.exports = purchase_items;