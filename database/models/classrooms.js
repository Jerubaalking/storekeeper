const { Model, DataTpes, sequelize } = require("../mysql");
const schools = require("./schools");
class classrooms extends Model { };
classrooms= sequelize.define({
    id: {
        type: DataTpes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTpes.STRING,
});
classrooms.belongsTo(schools);
schools.hasMany(classrooms);
module.exports = classrooms;