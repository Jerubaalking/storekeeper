const { Model, DataTypes, sequelize } = require("../mysql");
class languages extends Model { };
languages = sequelize.define('languages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    abbreviation:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    }
});
module.exports = languages;