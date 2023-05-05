const { Model, Sequelize, sequelize } = require("../mysql");
class assets extends Model { };
assets = sequelize.define('assets', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    folder: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    extension: {
        type: Sequelize.ENUM('.jpeg', '.jpg', '.mp4', '.mp3', '.gif', '.pdf', '.odf'),
        allowNull: false
    }
}, { paranoid: true });
module.exports = assets;