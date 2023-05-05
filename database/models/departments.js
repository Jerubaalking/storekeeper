const { Model, DataTypes, sequelize } = require("../mysql");
const stores = require("./stores/stores");
class departments extends Model { };
departments = sequelize.define('departments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    purpose: { type: DataTypes.STRING },
    comments: { type: DataTypes.STRING },
});
departments.belongsTo(stores);
stores.hasMany(departments);
module.exports = departments;