const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
const menus = require("../menus");
class shop_menus extends Model { };
shop_menus = sequelize.define('shop_menus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(menus, { through: shop_menus });
menus.belongsToMany(stores, { through: shop_menus });
shop_menus.belongsTo(sessions);
sessions.hasMany(shop_menus);
shop_menus.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    shop_menus.sessionId = await session.id;
})
module.exports = shop_menus;