const { Model, DataTypes, sequelize, Sequelize } = require("../../mysql");
const store_employees = require("./store_employees");
const sessions = require("../sessions");
const leaves = require("../leaves");
const leaves = require("../leaves");
const store_employees = require("./store_employees");
const leaves = require("../leaves");
class store_employee_leaves extends Model { };
store_employee_leaves = sequelize.define('store_employee_leaves', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('inactive', 'active', 'finished'),
        defaultValue: 'inactive'
    }
}, { paranoid: true });
store_employees.belongsToMany(leaves, { through: store_employee_leaves });
leaves.belongsToMany(store_employees, { through: store_employee_leaves });
store_employee_leaves.belongsTo(sessions);
sessions.hasMany(store_employee_leaves);
store_employee_leaves.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    store_employee_leaves.sessionId = await session.id;
});
module.exports = store_employee_leaves;