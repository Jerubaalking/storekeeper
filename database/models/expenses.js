const { Model, DataTypes, sequelize } = require("../mysql");
const sessions = require("./sessions");
class expenses extends Model { };
expenses = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    date: DataTypes.DATE,
    reason: DataTypes.STRING,
}, { sequelize, paranoid: true });
expenses.belongsTo(sessions);
sessions.hasMany(expenses);
module.exports = expenses;