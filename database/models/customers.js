const { Model, DataTypes, sequelize } = require("../mysql");
const businesses = require("./businessees/businesses");
const sessions = require("./sessions");
class customers extends Model { };
customers = sequelize.define('customers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    tin: { type: DataTypes.STRING },
}, { paranoid: true });

customers.belongsTo(sessions);
sessions.hasMany(customers);
module.exports = customers;