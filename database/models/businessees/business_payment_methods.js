const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("../stores/stores");
const sessions = require("../sessions");
const payment_methods = require("../payment_methods");
class business_payment_methods extends Model { };
business_payment_methods = sequelize.define('business_payment_methods', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(payment_methods, { through: business_payment_methods });
payment_methods.belongsToMany(stores, { through: business_payment_methods });
business_payment_methods.belongsTo(sessions);
sessions.hasMany(business_payment_methods);
business_payment_methods.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    business_payment_methods.sessionId = await session.id;
});
module.exports = business_payment_methods;