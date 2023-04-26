const { Model, DataTpes, sequelize } = require("../mysql");
const classes = require("./classes");
const schools = require("./schools");
const sessions = require("./sessions");
const students = require("./students");
const vehicles = require("./vehicles");
class bus_routes extends Model { };
bus_routes=sequelize.define({
    id: {
        type: DataTpes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTpes.STRING,
    roads: DataTpes.STRING,
    route_start: DataTpes.STRING,
    route_end: DataTpes.STRING,
});
bus_routes.belongsTo(schools);
schools.hasMany(bus_routes);
bus_routes.belongsTo(sessions);
sessions.hasMany(bus_routes);
bus_routes.belongsTo(vehicles);
vehicles.hasMany(bus_routes);
module.exports = bus_routes;