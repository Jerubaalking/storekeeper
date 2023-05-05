const { Model, DataTypes, sequelize } = require("../../mysql");
const authorizers = require("../authorizers");
const businesses = require("../businesses");
const invoices = require("../invoices");
const sessions = require("../sessions");
const store_employees = require("./store_employees");
const stores = require("./stores");
const transactions = require("../transactions");
const users = require("../users");
class store_authorizer_access extends Model { };
store_authorizer_access = sequelize.define('store_authorizer_access', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    allowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

authorizers.belongsToMany(store_employees, { through: store_authorizer_access });
store_employees.belongsToMany(authorizers, { through: store_authorizer_access });

authorizers.belongsToMany(sessions, { through: store_authorizer_access });
sessions.belongsToMany(authorizers, { through: store_authorizer_access });

module.exports = store_authorizer_access;