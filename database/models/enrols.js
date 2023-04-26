const { Model, DataTypes, sequelize } = require("../mysql");
const stores = require("./stores");
const businesses = require("./businesses");
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
},);
enrols.belongsTo(stores);
stores.hasMany(enrols);
enrols.belongsTo(sessions);
sessions.hasMany(enrols);
enrols.belongsTo(customers);
customers.hasMany(enrols);
enrols.belongsTo(businesses);
businesses.hasMany(enrols);
enrols.belongsTo(personels);
personels.hasMany(enrols);
module.exports = enrols;