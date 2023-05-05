const { Model, sequelize, DataTypes, Sequelize } = require("../mysql");
const regions = require('./regions');
class niches extends Model { };
niches = sequelize.define('niches', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { timestamps: true });
niches.belongsTo(regions);
regions.hasMany(niches);
module.exports = niches;