const { Model, DataTypes, sequelize } = require("../../mysql");
const stores = require("./stores");
const sessions = require("../sessions");
const salaries = require("../salaries");
const store_employees = require("./store_employees");
class store_salaries extends Model { };
store_salaries = sequelize.define('store_salaries', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
stores.belongsToMany(salaries, { through: store_salaries });
salaries.belongsToMany(stores, { through: store_salaries });
store_employees.belongsToMany(salaries, { through: store_salaries });
salaries.belongsToMany(store_employees, { through: store_salaries });
store_salaries.belongsTo(sessions);
sessions.hasMany(store_salaries);
store_salaries.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    store_salaries.sessionId = await session.id;
})
module.exports = store_salaries;