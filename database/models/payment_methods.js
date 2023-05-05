const { Model, Sequelize, sequelize } = require("../mysql");
const sessions = require("./sessions");
const currencies = require("./currencies");
class payment_methods extends Model { };
payment_methods = sequelize.define('payment_methods', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    account_no: Sequelize.STRING,
    payment_type: {
        type: Sequelize.ENUM('mobile-money', 'cash', 'bank'),
        defaultValue: 'cash'
    },
    authorization: {
        type: Sequelize.ENUM('authorized', 'pending', 'unauthorized'),
        defaultValue: 'pending'
    },
    comment: Sequelize.STRING,

}, { paranoid: true });
payment_methods.belongsTo(currencies);
currencies.hasMany(payment_methods);
payment_methods.belongsTo(sessions);
sessions.hasMany(payment_methods);
module.exports = payment_methods;