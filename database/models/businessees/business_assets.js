const assets = require("../assets");
const { Model, Sequelize, sequelize } = require("../../mysql");
const businesses = require("./businesses");
const sessions = require("../sessions");
class business_assets extends Model { };
business_assets = sequelize.define('business_assets', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
assets.belongsToMany(businesses, { through: business_assets });
businesses.belongsToMany(assets, { through: business_assets });
assets.belongsToMany(sessions, { through: business_assets });
sessions.belongsToMany(assets, { through: business_assets });
module.exports = business_assets;