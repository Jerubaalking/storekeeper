const { Model, DataTypes, sequelize } = require("../mysql");
const classes = require("./classes");
const schools = require("./schools");
const sessions = require("./sessions");
const students = require("./students");
const vehicles = require("./vehicles");
class noticeboard extends Model { };
noticeboard = sequelize.define('frontend_gallary_images', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    notice_title: DataTypes.STRING,
    notice: DataTypes.STRING,
    date: DataTypes.DATE,
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    show_on_website: DataTypes.STRING,
    image: DataTypes.STRING,
});
noticeboard.belongsTo(schools);
schools.hasMany(noticeboard);
noticeboard.belongsTo(sessions);
sessions.hasMany(noticeboard);
module.exports = noticeboard;