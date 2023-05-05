const { Model, DataTypes, sequelize } = require("../mysql");
const authorizers = require("./authorizers");
const sessions = require("./sessions");
const stores = require("./stores/stores");
const users = require("./users");
class authorizer_access extends Model { };
authorizer_access = sequelize.define('authorizer_access', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
authorizers.belongsToMany(users, { through: authorizer_access });
users.belongsToMany(authorizers, { through: authorizer_access });

authorizers.belongsToMany(stores, { through: authorizer_access });
stores.belongsToMany(authorizers, { through: authorizer_access });

authorizers.belongsToMany(sessions, { through: authorizer_access });
sessions.belongsToMany(authorizers, { through: authorizer_access });

module.exports = authorizer_access;