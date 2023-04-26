const { Model, DataTpes, sequelize } = require("../mysql");
const schools = require("./schools");
const sessions = require("./sessions");
class exams extends Model { };
exams= sequelize.define({
    id: {
        type: DataTpes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:DataTpes.STRING,
    category:DataTpes.STRING,
    starting_date :DataTpes.DATE,
    ending_date :DataTpes.DATE,

});
exams.belongsTo(schools);
schools.hasMany(exams);
exams.belongsTo(sessions);
sessions.hasMany(exams);
module.exports = exams;