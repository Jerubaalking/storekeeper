const { Model, Sequelize, sequelize } = require("../mysql");
const drop_offs = require("./drop_offs");
const students = require("./students");
class students_routes extends Model { };
students_routes.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});
students_routes.belongsTo(students);
students.hasMany(students_routes);
students_routes.belongsTo(drop_offs);
drop_offs.hasMany(students_routes);
module.exports = students_routes;