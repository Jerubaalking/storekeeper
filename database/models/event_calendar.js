const { Model, DataTpes, sequelize } = require("../mysql");
const classes = require("./classes");
const schools = require("./schools");
const sessions = require("./sessions");
const students = require("./students");
const vehicles = require("./vehicles");
class event_calendar extends Model { };
event_calendar= sequelize.define({
    id: {
        type: DataTpes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTpes.STRING,
    starting_date: DataTpes.DATE,
    ending_date: DataTpes.DATE,
});
event_calendar.belongsTo(schools);
schools.hasMany(event_calendar);
event_calendar.belongsTo(sessions);
sessions.hasMany(event_calendar);
module.exports = event_calendar;