const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
const payment_methods = require("../payment_methods");
class store_payment_methods extends Model { };
store_payment_methods = sequelize.define('store_payment_methods', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(payment_methods, { through: store_payment_methods });
payment_methods.belongsToMany(stores, { through: store_payment_methods });
store_payment_methods.belongsTo(sessions);
sessions.hasMany(store_payment_methods);
store_payment_methods.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    store_payment_methods.sessionId = await session.id;
});
module.exports = store_payment_methods;