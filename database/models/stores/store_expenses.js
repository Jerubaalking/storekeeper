const { Model, sequelize, DataTypes } = require("../../mysql");
const sessions = require("../sessions");
const stores = require("./stores");
class store_expenses extends Model { };
store_expenses = sequelize.define('store_expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    date: DataTypes.DATE,
    reason: DataTypes.STRING,
}, { timestamps: true });

store_expenses.belongsTo(sessions);
sessions.hasMany(store_expenses);
store_expenses.belongsTo(stores);
stores.hasMany(store_expenses);
module.exports = store_expenses;