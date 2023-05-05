const { Model, DataTypes, sequelize } = require("../../mysql");
const businesses = require("./businesses");
const sessions = require("../sessions");
const notifications = require("../notifications");
class business_notifications extends Model { };
business_notifications = sequelize.define('business_notifications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
businesses.belongsToMany(notifications, { through: business_notifications });
notifications.belongsToMany(businesses, { through: business_notifications });
business_notifications.belongsTo(sessions);
sessions.hasMany(business_notifications);
business_notifications.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    business_notifications.sessionId = await session.id;
})
module.exports = business_notifications;