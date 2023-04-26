const { Model, DataTypes, sequelize } = require("../mysql");
const expenses_categories = require("./expenses_categories");
const businesses = require("./businesses");
const sessions = require("./sessions");
const stores = require("./stores");
const users = require("./users");
class expenses extends Model { };
expenses = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: DataTypes.DOUBLE,
    date: DataTypes.DATE,
    reason: DataTypes.STRING,
}, { sequelize, paranoid: true });
expenses.belongsTo(businesses);
businesses.hasMany(expenses);
expenses.belongsTo(stores);
stores.hasMany(expenses);
expenses.belongsTo(sessions);
sessions.hasMany(expenses);
expenses.belongsTo(expenses_categories);
sessions.hasMany(users);
users.belongsTo(expenses_categories);
expenses_categories.hasMany(expenses);
module.exports = expenses;