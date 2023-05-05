const { Model, sequelize, DataTypes } = require("../../mysql");
const businesses = require("../businessees/businesses");
class stores extends Model { };
stores = sequelize.define('stores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    registration: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone: DataTypes.TEXT,
}, { paranoid: true });
stores.belongsTo(businesses);
businesses.hasMany(stores);
module.exports = stores;