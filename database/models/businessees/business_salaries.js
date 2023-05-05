const { Model, DataTypes, sequelize } = require("../../mysql");
const businesses = require("./businesses");
const sessions = require("../sessions");
const salaries = require("../salaries");
class business_salaries extends Model { };
business_salaries = sequelize.define('business_salaries', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { paranoid: true });
businesses.belongsToMany(salaries, { through: business_salaries });
salaries.belongsToMany(businesses, { through: business_salaries });
business_salaries.belongsTo(sessions);
sessions.hasMany(business_salaries);
business_salaries.beforeCreate('add_session', async () => {
    let session = JSON.parse(JSON.stringify(await sessions.findOne({ where: { status: 'active' } })));
    business_salaries.sessionId = await session.id;
})
module.exports = business_salaries;