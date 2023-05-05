const { Model, Sequelize, sequelize } = require("../../mysql");
const services = require("../services");
const stores = require("./stores");
class store_sessions extends Model { };
store_sessions = sequelize.define('store_sessions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    start_date_time: Sequelize.DATE,
    end_date_time: Sequelize.DATE,
}, { paranoid: true });
store_sessions.belongsTo(services);
services.hasMany(store_sessions);
store_sessions.belongsTo(stores);
stores.hasMany(store_sessions);
module.exports = store_sessions;