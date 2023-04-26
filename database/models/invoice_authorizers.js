const { Model, DataTypes, sequelize } = require("../mysql");
const invoices = require("./invoices");
const users = require("./users");
class invoice_authorizers extends Model { };
invoice_authorizers = sequelize.define('invoice_authorizers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
invoices.belongsToMany(users, { through: invoice_authorizers });
users.belongsToMany(invoices, { through: invoice_authorizers });
module.exports = invoice_authorizers;