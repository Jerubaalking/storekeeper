const { Model, Sequelize, sequelize } = require("../mysql");
const classes = require("./classes");
const schools = require("./schools");
const sections = require("./sections");
const sessions = require("./sessions");
const subjects = require("./subjects");
class syllabuses extends Model { };
syllabuses.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    title: Sequelize.STRING,
    file: Sequelize.STRING,
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
});
syllabuses.belongsTo(schools);
schools.hasMany(syllabuses);
syllabuses.belongsTo(classes);
classes.hasMany(syllabuses);
syllabuses.belongsTo(sections);
sections.hasMany(syllabuses);
syllabuses.belongsTo(subjects);
subjects.hasMany(syllabuses);
syllabuses.belongsTo(sessions);
sessions.hasMany(syllabuses);
module.exports = syllabuses;