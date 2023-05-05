const { Model, DataTypes, sequelize } = require("../mysql");
class contacts extends Model { };
contacts = sequelize.define('contacts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    number: { type: DataTypes.STRING }
}, { paranoid: true });
module.exports = contacts;