const { Model, Sequelize, sequelize } = require("../mysql");
class smtp_settings extends Model { };

smtp_settings = sequelize.define('smtp_settings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    mail_sender: Sequelize.STRING,
    smtp_protocol: Sequelize.STRING,
    smtp_host: Sequelize.STRING,
    smtp_username: Sequelize.STRING,
    smtp_password: Sequelize.STRING,
    smtp_port: Sequelize.STRING,
    smtp_secure: Sequelize.STRING,
    smtp_set_from: Sequelize.STRING,
    smtp_debug: Sequelize.STRING,
    smtp_show_error: Sequelize.STRING,
});

module.exports = smtp_settings;