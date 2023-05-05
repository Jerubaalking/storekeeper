const { Model, DataTypes, sequelize } = require("../mysql");
const sessions = require("./sessions");
class authorizers extends Model { };
authorizers = sequelize.define('authorizers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    // accept: {
    //     type: DataTypes.STRING,
    //     defaultValue: "['superadmin', 'admin', 'system-manager', 'employee-accountant', 'employee-sales', 'employee-marketing', 'employee-manager', 'employee-hr']"
    // },
}, { timestamps: true, paranoid: true });
authorizers.belongsTo(sessions);
sessions.hasMany(authorizers);
module.exports = authorizers;