const { Model, DataTypes, sequelize } = require("../mysql");
const authorizers = require("./authorizers");
const transactions = require("./transactions");
class transaction_authorizers extends Model { };
transaction_authorizers = sequelize.define('transaction_authorizers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
authorizers.belongsToMany(transactions, { through: transaction_authorizers });
transactions.belongsToMany(authorizers, { through: transaction_authorizers });
module.exports = transaction_authorizers;