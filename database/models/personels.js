const { Model, Sequelize, sequelize } = require("../mysql");
const businesses = require("./businesses");
const sessions = require("./sessions");
const users = require("./users");
class personels extends Model { };
personels = sequelize.define('personels', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: Sequelize.STRING,
}, { paranoid: true });
personels.belongsTo(businesses);
businesses.hasMany(personels);
personels.belongsTo(sessions);
sessions.hasMany(personels);
personels.belongsTo(users);
users.hasMany(personels);
module.exports = personels;