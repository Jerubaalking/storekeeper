const { Model, DataTypes, sequelize } = require("../mysql");

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
    country: { type: DataTypes.STRING, },
    country_code: { type: DataTypes.STRING, },
    comment: { type: DataTypes.STRING, },
    paypal_supported: { type: DataTypes.STRING, },
    stripe_supported: { type: DataTypes.STRING, },
});
module.exports = currencies;