const { Model, DataTypes, sequelize } = require("../../mysql");
const sessions = require("../sessions");
const businesses = require("./businesses");
class business_bonuses extends Model { };
business_bonuses = sequelize.define('business_bonuses',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    authorized: {
        type: DataTypes.BOOLEAN,
        defautValue: false
    }
});
business_bonuses.belongsTo(businesses);
businesses.hasMany(business_bonuses);
business_bonuses.belongsTo(sessions);
sessions.hasMany(business_bonuses);
module.exports = business_bonuses;