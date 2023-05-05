const { Model, DataTypes, sequelize } = require("../../mysql");
const authorizers = require("../authorizers");
const sessions = require("../sessions");
const users = require("../users");
class business_authorizer_access extends Model { };
business_authorizer_access = sequelize.define('business_authorizer_access', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    allowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

authorizers.belongsToMany(users, { through: business_authorizer_access });
users.belongsToMany(authorizers, { through: business_authorizer_access });

authorizers.belongsToMany(sessions, { through: business_authorizer_access });
sessions.belongsToMany(authorizers, { through: business_authorizer_access });

module.exports = business_authorizer_access;