const { Model, DataTypes, sequelize } = require("../../mysql");
const sessions = require("../sessions");
const deductions = require("../deductions");
const stores = require("../stores/stores");
class store_deductions extends Model { };
store_deductions = sequelize.define('store_deductions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(deductions, { through: store_deductions });
deductions.belongsToMany(stores, { through: store_deductions });
store_deductions.belongsTo(sessions);
sessions.hasMany(store_deductions);
module.exports = store_deductions;