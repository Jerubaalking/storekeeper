const { Model, DataTypes, sequelize } = require("../mysql");

const businesses = require("./businesses");
const sessions = require("./sessions");
class expenses_categories extends Model { };
expenses_categories = sequelize.define('expenseCategories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING
});
expenses_categories.belongsTo(businesses);
businesses.hasMany(expenses_categories);
expenses_categories.belongsTo(sessions);
sessions.hasMany(expenses_categories);
module.exports = expenses_categories;