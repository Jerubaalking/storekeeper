const { Model, Sequelize, sequelize } = require("../mysql");
const payment_methods = require("./payment_methods");
const stockIns = require("./stockIns");
class discounts extends Model { };
discounts = sequelize.define('discounts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
    },
    start: {
        type: Sequelize.DATE,
    },
    end: {
        type: Sequelize.DATE,
    },
    percent: {
        type: Sequelize.DOUBLE,
    },
    amount: {
        type: Sequelize.DOUBLE,
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
    }
}, { paranoid: true });
discounts.belongsTo(stockIns);
stockIns.hasMany(discounts);

module.exports = discounts;