const { Model, DataTypes, sequelize } = require("../mysql");
const users = require("./users");
class frontend_events extends Model { };
frontend_events = sequelize.define('frontend_events', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '0-inactive 1-active'
    }
});
frontend_events.belongsTo(schools);
schools.hasMany(frontend_events);
frontend_events.belongsTo(users, { as: 'created_by' });
users.hasMany(frontend_events, { as: 'created_by' });
module.exports = frontend_events;