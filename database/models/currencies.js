const { Model, DataTypes, sequelize } = require("../mysql");
const countries = require("./countries");
class currencies extends Model { };
currencies = sequelize.define('currencies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING, },
    code: { type: DataTypes.STRING, },
    symbol: { type: DataTypes.STRING, },
    paypal_supported: { type: DataTypes.BOOLEAN, },
    stripe_supported: { type: DataTypes.BOOLEAN, },
    vodacom_supported: { type: DataTypes.BOOLEAN, },
    safaricom_supported: { type: DataTypes.BOOLEAN, },
    tigo_supported: { type: DataTypes.BOOLEAN, },
    airtel_supported: { type: DataTypes.BOOLEAN, },
});
currencies.belongsTo(countries);
countries.hasMany(currencies);
module.exports = currencies;