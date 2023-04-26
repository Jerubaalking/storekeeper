const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const items = require("./items");
const sessions = require("./sessions");
const stores = require("./stores");
const users = require("./users");
class stockIns extends Model { };
stockIns = sequelize.define('stock_ins', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item_batch_number: Sequelize.STRING,
    manufacture_batch_number: Sequelize.STRING,
    manufacture_date: Sequelize.DATE,
    expire_date: Sequelize.DATE,
    qty: Sequelize.DOUBLE,
    amount: Sequelize.DOUBLE,
    manufacturer: Sequelize.STRING,
    item_weight: Sequelize.STRING,
    container: Sequelize.STRING,
    container_weight: Sequelize.STRING,
    qty_per_container: Sequelize.DOUBLE,
    receive_date: Sequelize.DATE,
    other_specs: Sequelize.STRING,
    inspected: Sequelize.BOOLEAN,
    selling_price: Sequelize.DOUBLE,
    comment: Sequelize.STRING,
}, { paranoid: true });

stockIns.belongsTo(items);
items.hasMany(stockIns);
stockIns.belongsTo(sessions);
sessions.hasMany(stockIns);
stockIns.belongsTo(businesses);
businesses.hasMany(stockIns);
stockIns.belongsTo(stores);
stores.hasMany(stockIns);

module.exports = stockIns;