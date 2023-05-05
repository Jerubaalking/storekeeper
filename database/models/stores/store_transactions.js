const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
const transactions = require("../transactions");
class store_transactions extends Model { };
store_transactions = sequelize.define('store_transactions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(transactions, { through: store_transactions });
transactions.belongsToMany(stores, { through: store_transactions });
store_transactions.belongsTo(sessions);
sessions.hasMany(store_transactions);
store_transactions.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    store_transactions.sessionId = await session.id;
});
module.exports = store_transactions;