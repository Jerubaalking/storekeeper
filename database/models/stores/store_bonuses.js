const { Model, DataTypes, sequelize } = require("../../mysql");
const sessions = require("../sessions");
const stores = require("./stores");
class store_bonuses extends Model { };
store_bonuses = sequelize.define({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    authorized: {
        type: DataTypes.BOOLEAN,
        defautValue: false
    }
});
store_bonuses.belongsTo(stores);
stores.hasMany(store_bonuses);
store_bonuses.belongsTo(sessions);
sessions.hasMany(store_bonuses);
module.exports = store_bonuses;