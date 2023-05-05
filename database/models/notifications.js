const { Model, DataTypes, sequelize } = require("../mysql");
const stores = require("./stores/stores");
const sessions = require("./sessions");
const menus = require("./menus");
class notifications extends Model { };
notifications = sequelize.define('notifications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'read')
    }
}, { paranoid: true });
stores.belongsToMany(menus, { through: notifications });
menus.belongsToMany(stores, { through: notifications });
notifications.belongsTo(sessions);
sessions.hasMany(notifications);
notifications.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    notifications.sessionId = await session.id;
})
module.exports = notifications;