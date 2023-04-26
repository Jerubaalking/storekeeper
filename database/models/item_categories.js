const { Model, DataTypes, sequelize } = require("../mysql");
const stores = require("./stores");
class item_categories extends Model { };
item_categories = sequelize.define('item_categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    warning: {
        type: DataTypes.ENUM('harzadous', 'toxic', 'radioactive', 'poisonous', 'none'),
        defaultValue: 'none',
    },
    reaction: {
        type: DataTypes.ENUM('flamable', 'inflamable', 'conditional', 'corrosive', 'catalyst', 'none'),
        defaultValue: 'none',
    },
});
item_categories.belongsTo(stores);
stores.hasMany(item_categories);
module.exports = item_categories;