const { Model, Sequelize, DataTypes, sequelize } = require("../mysql");
const businesses = require("./businessees/businesses");
const customers = require("./customers");
const items = require("./items");
const sessions = require("./sessions");
const stockIns = require("./puchase_items");
const stores = require("./stores/stores");
class stockOuts extends Model { };
stockOuts = sequelize.define('stock_outs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    qty: Sequelize.DOUBLE,
    comment: Sequelize.STRING,
    discount_percent: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    discount_amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    status: {
        type: DataTypes.ENUM('booked', 'quoted', 'sold'),
        defaultValue: 'booked'
    }
}, { paranoid: true });

stockOuts.belongsTo(items);
items.hasMany(stockOuts);
stockOuts.belongsTo(stockIns);
stockIns.hasMany(stockOuts);
stockOuts.belongsTo(businesses);
businesses.hasMany(stockOuts);
stockOuts.belongsTo(stores);
stores.hasMany(stockOuts);
stockOuts.belongsTo(customers);
customers.hasMany(stockOuts);
stockOuts.belongsTo(sessions);
sessions.hasMany(stockOuts);

module.exports = stockOuts;