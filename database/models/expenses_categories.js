const { Model, DataTypes, sequelize } = require("../mysql");

const sessions = require("./sessions");
const stores = require("./stores/stores");
class expenses_categories extends Model { };
expenses_categories = sequelize.define('expenseCategories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
});
expenses_categories.belongsTo(stores);
stores.hasMany(expenses_categories);
expenses_categories.belongsTo(sessions);
sessions.hasMany(expenses_categories);
module.exports = expenses_categories;