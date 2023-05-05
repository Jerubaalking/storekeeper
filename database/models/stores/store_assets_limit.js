const assets = require("../assets");
const { Model, Sequelize, sequelize } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
class store_asset_limits extends Model { };
store_asset_limits = sequelize.define('store_asset_limits', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    images: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 50
    },
    video: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
    },
    files: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 50
    }
}, { paranoid: true });
assets.belongsTo(store_asset_limits);
store_asset_limits.hasMany(assets);
module.exports = store_asset_limits;