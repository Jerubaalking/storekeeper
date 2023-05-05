const { Model, sequelize, DataTypes } = require("../../mysql");
const sessions = require("../sessions");
const stores = require("./stores");
class store_expense_categories extends Model { };
store_expense_categories = sequelize.define('store_expense_categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

store_expense_categories.belongsTo(sessions);
sessions.hasMany(store_expense_categories);
store_expense_categories.belongsTo(stores);
stores.hasMany(store_expense_categories);
module.exports = store_expense_categories;