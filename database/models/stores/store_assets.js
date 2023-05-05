const assets = require("../assets");
const { Model, Sequelize, sequelize } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
class store_assets extends Model { };
store_assets = sequelize.define('store_assets', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
assets.belongsToMany(stores, { through: store_assets });
stores.belongsToMany(assets, { through: store_assets });

module.exports = store_assets;