const { Model, DataTypes, sequelize } = require("../mysql");
const businesses = require("./businesses");
const sessions = require("./sessions");
const stores = require("./stores");
class customers extends Model { };
customers = sequelize.define('customers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    tin: { type: DataTypes.STRING },
}, { paranoid: true });

customers.belongsTo(sessions);
sessions.hasMany(customers);
customers.belongsTo(businesses);
businesses.hasMany(customers);
customers.belongsTo(stores);
stores.hasMany(customers);
module.exports = customers;