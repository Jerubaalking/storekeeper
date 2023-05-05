const { Model, DataTypes, sequelize } = require("../mysql");
class addresses extends Model { };
addresses = sequelize.define('addresses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    address: { type: DataTypes.STRING },
}, { paranoid: true });
module.exports = addresses;