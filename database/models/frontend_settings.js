const { Model, DataTypes, sequelize } = require("../mysql");

class frontend_settings extends Model { };
frontend_settings= sequelize.define({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    about_us: DataTypes.STRING,
    terms_conditions: DataTypes.STRING,
    privacy_policy: DataTypes.STRING,
    copyright_text: DataTypes.STRING,
    about_us_image: DataTypes.STRING,
    slider_images: DataTypes.STRING,
    theme: DataTypes.STRING,
    homepage_note_title: DataTypes.STRING,
    homepage_note_description: DataTypes.STRING,
    website_title: DataTypes.STRING
});
module.exports = frontend_settings;