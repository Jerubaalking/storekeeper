const { Model, DataTypes, sequelize } = require("../mysql");
const classes = require("./classes");
const schools = require("./schools");
const sessions = require("./sessions");
const students = require("./students");
const vehicles = require("./vehicles");
class frontend_gallery extends Model { };
frontend_gallery= sequelize.define({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date_added: DataTypes.DATE,
    show_on_website: DataTypes.STRING,
    image: DataTypes.STRING,
});
frontend_gallery.belongsTo(schools);
schools.hasMany(frontend_gallery);
module.exports = frontend_gallery;