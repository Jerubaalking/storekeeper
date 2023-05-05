const { Model, DataTypes, sequelize } = require("../mysql");
const niches = require("./niches");
const niches = require("./niches");
const items = require("./items");
class niche_items extends Model { };
niche_items = sequelize.define('niche_items', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
niches.belongsToMany(items, { through: niche_items });
items.belongsToMany(niches, { through: niche_items });
module.exports = niche_items;