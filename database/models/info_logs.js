const { Model, DataTypes, sequelize } = require("../mysql");
const invoices = require("./invoices");
const users = require("./users");
class info_logs extends Model { };
info_logs = sequelize.define('info_logs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    level:{
        type:DataTypes.STRING,
        defaultValue:'info'
    }
});
module.exports = info_logs;