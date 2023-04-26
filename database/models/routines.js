const { Model, Sequelize, sequelize } = require("../mysql");
const classrooms = require("./classrooms");
const schools = require("./schools");
const sections = require("./sections");
const sessions = require("./sessions");
const subjects = require("./subjects");
class routines extends Model { };
routines = sequelize.define('routines', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    starting_hour: Sequelize.STRING,
    ending_hour: Sequelize.STRING,
    starting_minute: Sequelize.STRING,
    ending_minute: Sequelize.STRING,
    day: Sequelize.STRING,
});
routines.belongsTo(schools);
schools.hasMany(routines);
routines.belongsTo(sessions);
sessions.hasMany(routines);
routines.belongsTo(classrooms);
classrooms.hasMany(routines);
routines.belongsTo(subjects);
subjects.hasMany(routines);
routines.belongsTo(sections);
sections.hasMany(routines);
module.exports = routines;