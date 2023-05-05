const { Model, sequelize, DataTypes, Sequelize } = require("../mysql");
const regions = require('./regions');
class leaves extends Model { };
leaves = sequelize.define('leaves', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('paid', 'unpaid'),
        defaultValue: 'unpaid',
    },
    payment_percent: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0
    }
}, { timestamps: true });
leaves.belongsTo(regions);
regions.hasMany(leaves);
module.exports = leaves;