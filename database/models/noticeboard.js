const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const sessions = require("./sessions");
class noticeboard extends Model { };
noticeboard = sequelize.define('noticeboards', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    notice_title: Sequelize.STRING,
    notice: Sequelize.STRING,
    date: Sequelize.DATE,
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    show_on_website: Sequelize.STRING,
    image: Sequelize.STRING,
});
noticeboard.belongsTo(businesses);
businesses.hasMany(noticeboard);
noticeboard.belongsTo(sessions);
sessions.hasMany(noticeboard);
module.exports = noticeboard;