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
    superadmin_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    admin_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    system_manager_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    customer_personel_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, employee_manager_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    employee_accountant_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    employee_sales_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, employee_marketing_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, employee_driver_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, employee_security_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    employee_semi_skilled_access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, employee_hr_access: {
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