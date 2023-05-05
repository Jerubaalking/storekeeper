const { Model, DataTypes, sequelize } = require("../mysql");
const menus = require("./menus");
class main_menus extends Model { };
main_menus = sequelize.define('main_menus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
main_menus.belongsTo(menus);
menus.hasMany(main_menus);
module.exports = main_menus;