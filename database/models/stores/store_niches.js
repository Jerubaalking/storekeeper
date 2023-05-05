const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const niches = require("../niches");
class store_niches extends Model { };
store_niches = sequelize.define('store_niches', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
stores.belongsToMany(niches, { through: store_niches });
niches.belongsToMany(stores, { through: store_niches });
module.exports = store_niches;