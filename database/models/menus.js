const { Model, Sequelize, sequelize } = require("../mysql");
class menus extends Model { };
menus = sequelize.define('menus', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    display_name: Sequelize.STRING,
    route_name: Sequelize.STRING,
    parent: Sequelize.INTEGER,
    icon: Sequelize.STRING,
    superadmin: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    admin: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    business_admin: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    business_manager: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    business_accountant: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    store_admin: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    store_manager: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    store_accountant: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    store_sales: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, 
    store_marketing: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    store_stocker: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    customer: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    sort_order: {
        type: Sequelize.INTEGER
    },
    is_addon: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: 'if the value is 1 that means its addon'
    },
    unique_identifier: {
        type: Sequelize.INTEGER,
        comment: 'its mandatory for addon'
    }
});
module.exports = menus;