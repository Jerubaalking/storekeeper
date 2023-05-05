const { Model, DataTypes, sequelize } = require("../../mysql");
const businesses = require("./businesses");
const sessions = require("../sessions");
const menus = require("../menus");
class business_menus extends Model { };
business_menus = sequelize.define('business_menus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
businesses.belongsToMany(menus, { through: business_menus });
menus.belongsToMany(businesses, { through: business_menus });
business_menus.belongsTo(sessions);
sessions.hasMany(business_menus);
business_menus.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    business_menus.sessionId = await session.id;
})
module.exports = business_menus;