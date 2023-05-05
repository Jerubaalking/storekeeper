const { passwordHash } = require('../backend/controllers/services/service');
const {
    roles,
    store_menus,
    business_addresses,
    business_assets,
    business_authorizer_access,
    business_bonuses,
    business_contacts,
    business_employees,
    business_employees_attendances,
    business_invoices,
    business_menus,
    business_notifications,
    business_payment_methods,
    store_asset_limits,
    store_assets,
    store_deductions,
    stores,
    user_role_permissions,
    user_roles, stockOuts,
    sessions, userRoles, userRolePermissions,
    permissions,
    currencies, transactions,
    authorizer_access,
    businesses, item_categories, items, users, smtp_settings, settings, personels,
    departments, customers, salaries, stock_out_invoices, invoice_stockIns,
    invoice_stockOuts,
    invoice_transactions,
    transaction_authorizers,
    invoice_authorizers,
    authorizers,
    stockIn_transactions,
    noticeboard, menus, sales, expenses_categories, expenses, deductions, payment_methods, invoices, enrols, employees_permissions, deductions_charts
} = require('./models/module_exporter');
const { Op } = require('./mysql');
module.exports = async executeInitialQueries => {

    try {
        const { arrayIndex, arrayList } = require('../rearranger');
        const menuArray = [];
        for (const array in arrayList) {
            let dataObject = {};
            for (const key in arrayIndex) {
                dataObject[arrayIndex[key]] = arrayList[array][key];
            }
            // console.log(dataObject);
            await menus.create(dataObject);
        }
        // console.log(menuArray);
        await sessions.create({ name: '2023', status: 1 });
        await authorizers.create({ title: 'invoice', accept: "['admin', 'employee-accountant', 'employee-manager']" });
        await authorizers.create({ title: 'profoma', accept: "['admin', 'system-manager', 'employee-accountant', 'employee-sales', 'employee-marketing', 'employee-manager']" });
        await authorizers.create({ title: 'payment', accept: "['admin', 'employee-accountant','employee-manager']" });
        await authorizers.create({ title: 'transaction', accept: "['admin', 'employee-accountant', 'employee-sales', 'employee-manager']" });
        await roles.bulkCreate([{ role: 'superadmin' }, { role: 'admin' }, { role: 'system-manager' }, { role: 'customer-personel' }, { role: 'employee-sales' }, { role: 'employee-marketing' }, { role: 'employee-driver' }, { role: 'employee-security' }, { role: 'employee-hr' }, { role: 'employee-semi-skilled' }]);
        await permissions.bulkCreate([{ permission: 'all' }, { permission: 'create' }, { permission: 'edit' }, { permission: 'delete' }, { permission: 'view' }]);

        await user_role_permissions.create({ permissionId: 1, roleId: 1 });
        // await users.destroy({ where: { [Op.not]: { id: 1 } }, paranoid: false })
        // await user_roles.destroy({ where: { [Op.not]: { userId: 1 } }, paranoid: false })
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