const { Model, DataTypes, sequelize } = require("../mysql");
class sections extends Model { };
sections.init('sections', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING },
});
module.exports = sections;