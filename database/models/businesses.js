const { Model, DataTypes, sequelize } = require("../mysql");
class businesses extends Model { };
businesses = sequelize.define('businesses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    registration: { type: DataTypes.STRING },
    tin: { type: DataTypes.STRING },
    license: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING },
    vision: { type: DataTypes.STRING },
    mission_statement: { type: DataTypes.STRING },
    logo: { type: DataTypes.STRING },
    stamp: { type: DataTypes.STRING },
}, { paranoid: true });
module.exports = businesses;