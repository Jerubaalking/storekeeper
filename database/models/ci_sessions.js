const { Model, DataTpes, sequelize } = require("../mysql");

class ci_sessions extends Model { };
ci_sessions= sequelize.define({
    id: {
        type: DataTpes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ip_address: DataTpes.STRING,
    data: DataTpes.BLOB,
    timestamp: DataTpes.DATE
});
module.exports = ci_sessions;