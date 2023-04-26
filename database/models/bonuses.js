const { Model, DataTpes, sequelize } = require("../mysql");

const schools = require("./schools");
const sessions = require("./sessions");
class bonuses extends Model { };
bonuses=sequelize.define({
    id: {
        type: DataTpes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: DataTpes.DOUBLE,
    name: DataTpes.STRING,
});
bonuses.belongsTo(schools);
schools.hasMany(bonuses);
bonuses.belongsTo(sessions);
sessions.hasMany(bonuses);
module.exports = bonuses;