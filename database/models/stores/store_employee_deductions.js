const { Model, DataTypes, sequelize } = require("../../mysql");
const store_employees = require("./store_employees");
const sessions = require("../sessions");
const salaries = require("../salaries");
const store_employees = require("./store_employees");
class store_salary_dedutions extends Model { };
store_salary_dedutions = sequelize.define('store_salary_dedutions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
store_employees.belongsToMany(salaries, { through: store_salary_dedutions });
salaries.belongsToMany(store_employees, { through: store_salary_dedutions });
store_salary_dedutions.belongsTo(sessions);
sessions.hasMany(store_salary_dedutions);
store_salary_dedutions.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    store_salary_dedutions.sessionId = await session.id;
})
module.exports = store_salary_dedutions;