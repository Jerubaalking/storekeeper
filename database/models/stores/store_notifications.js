const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
const notifications = require("../notifications");
class store_notifications extends Model { };
store_notifications = sequelize.define('store_notifications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(notifications, { through: store_notifications });
notifications.belongsToMany(stores, { through: store_notifications });
store_notifications.belongsTo(sessions);
sessions.hasMany(store_notifications);
store_notifications.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    store_notifications.sessionId = await session.id;
})
module.exports = store_notifications;