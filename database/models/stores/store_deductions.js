const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
const deductions = require("../deductions");
const deductions = require("../deductions");
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
store_deductions.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    store_deductions.sessionId = await session.id;
})
module.exports = store_deductions;