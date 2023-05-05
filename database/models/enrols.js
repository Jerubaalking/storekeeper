const { Model, DataTypes, sequelize } = require("../mysql");
const stores = require("./stores/stores");
const businesses = require("./businessees/businesses");
const sessions = require("./sessions");
const customers = require("./customers");
const personels = require("./personels");
class enrols extends Model { };
enrols = sequelize.define('enrols', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(customers, { through: enrols });
customers.belongsToMany(stores, { through: enrols });
personels.belongsToMany(customers, { through: enrols });
customers.belongsToMany(personels, { through: enrols });
enrols.belongsTo(sessions);
sessions.hasMany(enrols);
enrols.belongsTo(businesses);
businesses.hasMany(enrols);
module.exports = enrols;