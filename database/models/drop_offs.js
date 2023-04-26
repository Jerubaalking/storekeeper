const { Model, DataTypes, sequelize } = require("../mysql");
const bus_routes = require("./bus_routes");
const classes = require("./classes");
const schools = require("./schools");
const sessions = require("./sessions");
class drop_offs extends Model { };
drop_offs = sequelize.define('drop_offs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    street: DataTypes.STRING,
    stop: DataTypes.STRING,
});
drop_offs.belongsTo(bus_routes);
bus_routes.hasMany(drop_offs);
drop_offs.belongsTo(classes);
classes.hasMany(drop_offs);
drop_offs.belongsTo(sessions);
sessions.hasMany(drop_offs);
module.exports = drop_offs;