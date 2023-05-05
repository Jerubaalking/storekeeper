const { Model, DataTypes, sequelize } = require("../mysql");
const sessions = require("./sessions");
class invoices extends Model { };
// class sales_invoices extends Model { };
invoices = sequelize.define('invoices', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
    },
    level: {
        type: DataTypes.ENUM('profoma', 'invoice', 'sale'),
        defaultValue: 'profoma',
    },
    mailed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    notice: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    comment: {
        type: DataTypes.STRING,
    },
    terms_and_conditions: {
        type: DataTypes.STRING,
    }
}, { paranoid: true });

invoices.belongsTo(sessions);
sessions.hasMany(invoices);
module.exports = invoices;