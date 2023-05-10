const { Model, DataTypes, sequelize } = require("../mysql");

class ci_sessions extends Model { };
ci_sessions= sequelize.define({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ip_address: DataTypes.STRING,
    data: DataTypes.BLOB,
    timestamp: DataTypes.DATE
});
module.exports = ci_sessions;