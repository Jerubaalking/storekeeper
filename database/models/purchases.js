const { Model, Sequelize, sequelize } = require("../mysql");
const payment_methods = require("./payment_methods");
const stockIns = require("./stockIns");
class purchases extends Model { };
purchases = sequelize.define('purchases', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
    },
    authorized: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    receipt: {
        type: Sequelize.STRING,
    }
}, { paranoid: true });
purchases.belongsTo(stockIns);
stockIns.hasMany(purchases);

module.exports = purchases;