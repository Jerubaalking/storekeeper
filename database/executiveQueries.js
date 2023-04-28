const { passwordHash } = require('../backend/controllers/services/service');
const {
    roles,
    user_role_permissions,
    user_roles,
    sessions, userRoles, userRolePermissions,
    permissions,
    currencies, stockIns, transactions,
    stockOuts,
    businesses, item_categories, items, users, smtp_settings, settings, personels,
    departments, employees, customers, salaries, stock_out_invoices, stores, invoice_stockIns,
    invoice_stockOuts,
    invoice_transactions,
    transaction_authorizers,
    invoice_authorizers,
    authorizers,
    stockIn_transactions,
    noticeboard, menus, sales, expenses_categories, expenses, deductions, payment_methods, invoices, enrols, employees_permissions, employees_attendances, deductions_charts
} = require('./models/module_exporter');
module.exports = async executeInitialQueries => {

    try {
        const { arrayIndex, arrayList } = require('../rearranger');
        const menuArray = [];
        for (const array in arrayList) {
            let dataObject = {};
            for (const key in arrayIndex) {
                dataObject[arrayIndex[key]] = arrayList[array][key];
            }
            console.log(dataObject);
            menuArray.push(dataObject);
        }
        console.log(menuArray);
        await menus.bulkCreate(menuArray);
        await sessions.create({ name: '2023', status: 1 });
        await roles.bulkCreate([{ role: 'superadmin' }, { role: 'admin' }, { role: 'system-manager' }, { role: 'customer-personel' }, { role: 'employee-sales' }, { role: 'employee-marketing' }, { role: 'employee-driver' }, { role: 'employee-security' }, { role: 'employee-hr' }, { role: 'employee-semi-skilled' }]);
        await permissions.bulkCreate([{ permission: 'all' }, { permission: 'create' }, { permission: 'edit' }, { permission: 'delete' }, { permission: 'view' }]);

        await user_role_permissions.create({ permissionId: 1, roleId: 1 });
        let user = await users.build({ name: 'Gideon Sainyeye', email: 'gsainyeye@gmail.com', address: 'Arusha, Tanzania', phone: '+255658598333', gender: 'male', birthdate: new Date() });
        let its = await passwordHash('@73N@');
        user.hash = await its.hashHex;
        user.salt = await its.salt;
        user.iterations = await its.iterations;
        let us = await user.save();
        await user_roles.create({ roleId: 1, userId: us.id });
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}