const { Model, Sequelize, sequelize } = require("../mysql");
class users extends Model { };
users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    address: Sequelize.STRING,
    hash: Sequelize.STRING,
    salt: Sequelize.STRING,
    iterations: Sequelize.INTEGER,
    phone: {
        type: Sequelize.STRING,
        unique: true
    },
    blood_group: Sequelize.STRING,
    gender: Sequelize.STRING,
    birthday: Sequelize.DATE,
    remember_token: Sequelize.STRING,
    authentication_key: Sequelize.STRING,
}, { paranoid: true });
module.exports = users;