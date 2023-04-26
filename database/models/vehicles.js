const { Model, Sequelize, sequelize } = require("../mysql");
const sessions = require("./sessions");
class vehicles extends Model { };
vehicles.init('vehicles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    registration: Sequelize.STRING,
    name: Sequelize.STRING,
    model: Sequelize.STRING,
    make: Sequelize.STRING,
    capacity: Sequelize.STRING,
});
vehicles.belongsTo(sessions);
sessions.hasMany(vehicles);
module.exports = vehicles;