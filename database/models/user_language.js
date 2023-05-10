const { Model, DataTypes, sequelize } = require("../mysql");
const languages = require("./languages");
const users = require("./users");
class user_language extends Model { };
user_language = sequelize.define('user_language', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
users.belongsToMany(languages, { through: user_language });
languages.belongsToMany(users, { through: user_language });
module.exports = user_language;